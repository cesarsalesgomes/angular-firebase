import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { LoginComponent } from 'app/components/login/login.component';
import { PageNotFoundComponent } from 'app/components/page-not-found/page-not-found.component';
import { ProductsComponent } from 'app/components/products/products.component';
import { RegisterComponent } from 'app/components/register/register.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
  data: {
    title: 'Identificação'
  }
}, {
  path: 'register',
  component: RegisterComponent,
  data: {
    title: 'Registro'
  }
}, {
  path: 'products',
  component: ProductsComponent,
  data: {
    title: 'Produtos'
  }
}, {
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
}, {
  path: '**',
  component: PageNotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule { }
