import { AuthService } from './../../core/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from './../../core/product.service';
import { Product } from 'app/models/product';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  subs: Subscription[] = [];
  filter: string;

  constructor(
    public auth: AuthService,
    public modalService: NgbModal,
    public route: ActivatedRoute,
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  getProducts() {
    if (this.products.length === 0 || this.filter === undefined || this.filter.trim() === '') {
      return this.products;
    }

    return this.products.filter(v => {
      if (v.name.toLowerCase().includes(this.filter.toLowerCase())) {
        return true;
      }
      return false;
    })
  }

  updateModal(product: Product) {
    const modalRef = this.modalService.open(ProductFormUpdateComponent);
    modalRef.componentInstance.product = product;
  }

  removeModal(product: Product) {
    const modalRef = this.modalService.open(ProductFormRemoveComponent);
    modalRef.componentInstance.product = product;
    modalRef.componentInstance.products = this.products;
  }
}

@Component({
  selector: 'app-product-form-update',
  templateUrl: './product-form-update.component.html'
})
export class ProductFormUpdateComponent implements OnInit {
  @Input() product: Product;
  p: Product;
  message: string;

  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.p = { ...this.product };
  }

  updateProduct() {
    this.message = '';
    this.productService.updateProduct(this.p)
      .then(() => {
        console.log('Document successfully updated!');
        this.activeModal.close('');
      }).catch(err => {
        this.message = 'Erro ao atualizar documento!';
        console.error('Error updating document: ', err);
      });
  }
}

@Component({
  selector: 'app-product-form-remove',
  templateUrl: './product-form-remove.component.html'
})
export class ProductFormRemoveComponent {
  @Input() product: Product;
  @Input() products: Product[];

  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService
  ) { }

  removeProduct() {
    this.productService.removeProduct(this.product.uid)
      .then(() => {
        console.log('Document successfully deleted!');
        this.activeModal.close('');
      }).catch(err => {
        console.error('Error removing document: ', err);
      });
  }
}
