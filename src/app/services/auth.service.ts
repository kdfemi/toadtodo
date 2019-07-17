import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users = [new User('test@test.com', '123456', 'test') ];
  constructor() {}
}
