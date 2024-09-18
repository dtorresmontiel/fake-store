import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UsersService } from '@features/user/services/UsersService';
import { User } from '../models/User.model';
import { Observable, of, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersServiceApiRest implements UsersService {

  constructor(private http: HttpClient) { }

  baseEndPoint = 'https://backend.fake-store.com/users';

  getUserById(userId: number): Observable<User | undefined> {
    return this.http.get<User | undefined>(this.baseEndPoint + '/' + userId);
  }

  addFavoriteProduct(userId: number, productId: number): Observable<boolean> {
    return this.http.post(this.baseEndPoint + '/' + userId + '/favorites/' + productId, {}, { observe: 'response' })
      .pipe(map(resp => resp.ok));
  }

  removeFavoriteProduct(userId: number, productId: number): Observable<boolean> {
    return this.http.delete(this.baseEndPoint + '/' + userId + '/favorites/' + productId, { observe: 'response' })
      .pipe(map(resp => resp.ok));
  }

}
