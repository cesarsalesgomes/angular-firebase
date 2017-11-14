import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'app/models/user';
import { AuthService } from './../../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy, OnInit {
  email: string;
  message: string;
  subs: Subscription[] = [];

  constructor(
    public auth: AuthService,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
    this.subs.push(
      this.route.queryParams
        .subscribe(query => {
          this.email = query['email'];
        })
    );
  }

  ngOnDestroy() {
    for (const s of this.subs) {
      s.unsubscribe();
    }
  }

  onSubmit(f: NgForm) {
    if (f.value.password.length < 6) {
      this.message = 'Tamanho mínimo da senha: 6';
      return;
    }
    this.message = '';
    const user: User = {
      email: f.value.email,
      password: f.value.password,
      name: f.value.name
    };

    this.auth.register(user)
      .then(err => {
        if (err) {
          this.message = err;
          return;
        }
        this.router.navigate(['/products']);
      })
  }
}
