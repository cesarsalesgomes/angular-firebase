import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { User } from './../models/user';
import { Product } from 'app/models/product';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  user: User;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore
  ) { }

  createProduct(p: Product) {
    return this.auth.user.take(1)
      .toPromise()
      .then(user => {
        return this.afs.collection(`users/${user.uid}/products`).add(p);
      });
  }

  getProducts(): Observable<any> {
    return this.auth.user.take(1)
      .switchMap(user => {
        const productsCollection = this.afs.collection(`users/${user.uid}/products`, ref => ref.orderBy('_id'));
        return productsCollection.valueChanges();
      });
  }

  removeProduct(uid: string) {
    return this.auth.user.take(1)
      .toPromise()
      .then(user => {
        return this.afs.collection(`users/${user.uid}/products`).doc(uid).delete();
      });
  }

  updateProduct(p: Product) {
    return this.auth.user.take(1)
      .toPromise()
      .then(user => {
        return this.afs.collection(`users/${user.uid}/products`).doc(p.uid).set(p);
      });
  }

}
