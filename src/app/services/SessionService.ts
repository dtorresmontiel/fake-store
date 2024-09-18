
import { Injectable, inject } from '@angular/core';
import { UsersServiceApiRest } from '@features/user/infrastructure/UsersServiceApiRest';
import { User } from '@features/user/models/User.model';
import { Session } from '../models/Session.model';
import { BehaviorSubject, Observable, map, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private usersService: UsersServiceApiRest = inject(UsersServiceApiRest);
  private sessionSubject: BehaviorSubject<Session | undefined> = new BehaviorSubject<Session | undefined>(undefined);
  private session: Observable<Session | undefined> = this.sessionSubject.asObservable();

  initializeSession(userId: number): Observable<Session | undefined> {
    this.usersService.getUserById(userId).subscribe((user: User | undefined) => {
      if (user) {
        this.sessionSubject.next(<Session>{ user });
      }
    });
    return this.session;
  }

  getSession(): Observable<Session | undefined> {
    return this.session;
  }

  getUser(): Observable<User | undefined> {
    return this.session.pipe(map((session: Session | undefined) => session ? session.user : undefined));
  }

  addFavoriteProduct(productId: number): void {
    const unique = (arr: number[]) => arr.filter((value, index, arr) => index === arr.indexOf(value));
    this.session.pipe(take(1)).subscribe((session: Session | undefined) => {
      if (!session) return;
      const favoriteProducts = unique([...session.user.favoriteProducts, productId]);
      session.user = <User>Object.assign(session.user, { favoriteProducts });
      this.sessionSubject.next(session);
      this.usersService.addFavoriteProduct(session.user.id, productId).subscribe();
    });
  }

  removeFavoriteProduct(productId: number): void {
    this.session.pipe(take(1)).subscribe((session: Session | undefined) => {
      if (!session) return;
      const favoriteProducts = session.user.favoriteProducts.filter(id => id !== productId);
      session.user = <User>Object.assign(session.user, { favoriteProducts });
      this.sessionSubject.next(session);
      this.usersService.removeFavoriteProduct(session.user.id, productId).subscribe();
    });
  }

}
