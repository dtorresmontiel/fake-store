import { Observable } from 'rxjs';
import { User } from '../models/User.model';

export interface UsersService {
  getUserById(userId: number): Observable<User | undefined>;
  addFavoriteProduct(userId: number, productId: number): Observable<boolean>;
  removeFavoriteProduct(userId: number, productId: number): Observable<boolean>;
}
