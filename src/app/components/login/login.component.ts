import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'app/models/user';
import { AuthService } from './../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy, OnInit {
  message: string;
  sub: Subscription;
  title: string;
  width: number = window.innerWidth;

  constructor(
    public auth: AuthService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    window.onresize = e => { this.width = window.innerWidth };
  }

  ngOnDestroy() {
    window.removeEventListener('resize', window.onresize);
  }

  onSubmitLogin(f: NgForm) {
    if (f.value.passwordLogin.length < 6) {
      this.message = 'Tamanho mínimo da senha: 6';
    } else {
      const user: User = {
        email: f.value.emailLogin,
        password: f.value.passwordLogin
      };

      this.message = '';
      this.auth.login(user)
        .then(data => {
          this.router.navigate(['/products']);
        })
        .catch(err => {
          this.message = err.message
        })
    }
  }

  onSubmitRegister(f: NgForm) {
    const email: string = f.value.emailRegister;

    this.router.navigate(['/register'], { queryParams: { email } });
  }
}
