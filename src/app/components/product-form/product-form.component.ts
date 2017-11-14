import { AuthService } from './../../core/auth.service';
import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from './../../core/product.service';
import { Product } from 'app/models/product';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  @Input() products: Product[];
  isLoggedIn: boolean;

  constructor(
    public modalService: NgbModal,
    public auth: AuthService
  ) { }

  open() {
    const modalRef = this.modalService.open(ProductFormAddComponent);
    modalRef.componentInstance.products = this.products;
  }
}

@Component({
  selector: 'app-product-form-content',
  templateUrl: './product-form-content.component.html'
})
export class ProductFormAddComponent {
  @Input() products: Product[];
  name: string;
  description: string;
  price: number;
  message: string;

  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService
  ) { }

  submitProduct() {
    const product: Product = {
      name: this.name,
      description: this.description,
      price: this.price
    };
    this.message = '';

    this.productService.createProduct(product)
      .then(() => {
        this.activeModal.close('');
      })
      .catch(err => {
        this.message = 'Produto inválido';
      });
  }
}
