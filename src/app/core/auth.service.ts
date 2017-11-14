import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { User } from 'app/models/user';

@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      })
  }

  login(user: User) {
    const provider = new firebase.auth.EmailAuthProvider();
    return this.signInWithCredentials(provider, user);
  }

  logout() {
    return firebase.auth().signOut();
  }

  register(user: User) {
    const provider = new firebase.auth.EmailAuthProvider();
    return this.registerCredentials(provider, user);
  }

  private signInWithCredentials(provider, user) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  private registerCredentials(provider, user) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(credential => {
        user.uid = credential.uid;

        this.updateUserData(user);
      })
      .catch(e => e.message)
  }

  private updateUserData(user) {
    Reflect.deleteProperty(user, 'password')

    return this.afs.collection('users').doc(user.uid).set(user);
  }

}
