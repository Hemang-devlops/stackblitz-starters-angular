import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../components/header/header.component';
import { HomeComponent } from '../components/home/home.component';
// import { SellerComponent } from '../components/seller/seller.component';
import { AppRoutingModule } from './app-routing.module';
import { PagenotfoundComponent } from '../components/pagenotfound/pagenotfound.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SellerAuthComponent } from '../components/seller-auth/seller-auth.component';
import { SellerAddProductComponent } from '../components/seller-auth/seller-add-product/seller-add-product.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SellerEditProductComponent } from '../components/seller-auth/seller-edit-product/seller-edit-product.component';
import { SellerhomeComponent } from '../components/seller-auth/sellerhome/sellerhome.component';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule, 
    AppRoutingModule, 
    HttpClientModule, FontAwesomeModule
  ],
  declarations: [
    AppComponent,
    SellerAuthComponent,
    SellerAddProductComponent,
    SellerEditProductComponent,
    SellerhomeComponent,
    HeaderComponent,
    HomeComponent,
    // SellerComponent,
    // SellerhomeComponent,
    PagenotfoundComponent,
    FooterComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ],
})
export class AppModule {}
