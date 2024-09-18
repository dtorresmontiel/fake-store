import { User } from '@features/user/models/User.model';

export interface Session {
  user: User;
}