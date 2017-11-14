import { AngularFireModule } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { environment } from './../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  allowZero: false,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.'
};

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductsComponent, ProductFormRemoveComponent, ProductFormUpdateComponent } from './components/products/products.component';
import { ProductFormComponent, ProductFormAddComponent } from './components/product-form/product-form.component';
import { RegisterComponent } from './components/register/register.component';

// Pipes
import { ToPricePipe } from './pipes/to-price.pipe';

// Roteirização
import { AppRouterModule } from './app-router/app-router.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    ProductsComponent,
    NavigationComponent,
    RegisterComponent,
    ProductFormComponent,
    ProductFormAddComponent,
    ProductFormRemoveComponent,
    ProductFormUpdateComponent,
    ToPricePipe
  ],
  imports: [
    AppRouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    CoreModule,
    CurrencyMaskModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  entryComponents: [
    ProductFormAddComponent,
    ProductFormUpdateComponent,
    ProductFormRemoveComponent
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
