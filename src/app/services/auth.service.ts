import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { DataStorageService } from './data-storage.service';
import { UserModel } from '../model/user-model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userState: firebase.User;
  constructor(private userAuth: AngularFireAuth, private databaseService: DataStorageService) {
    userAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(
      () => {
        userAuth.authState.subscribe(
          (state) => {
             this.userState = state;
            }
        );
      });

  }

  signup(email: string, password: string, username: string) {
    return this.userAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(
      (newUser) => this.updateUser(username, email, newUser.user.uid)
    );
  }

  signin( email: string, password: string) {
    return this.userAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.userAuth.auth.signOut();
  }

  updateUser( username: string, email: string, uid: string) {
    const user = new UserModel(username, email);
    this.databaseService.updateUser(uid, user);
  }
  isAuthenticated() {
    return this.userState != null || undefined;
  }
}
