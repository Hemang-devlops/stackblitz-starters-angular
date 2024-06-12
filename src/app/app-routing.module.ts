import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth.guard';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { SellerhomeComponent } from './components/seller-auth/sellerhome/sellerhome.component';
import { SellerAddProductComponent } from './components/seller-auth/seller-add-product/seller-add-product.component';
import { SellerEditProductComponent } from './components/seller-auth/seller-edit-product/seller-edit-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CartComponent } from './components/cart/cart.component';
import { ViewAllComponent } from './components/view-all/view-all.component';
import { PaymentGatewayComponent } from './components/payment-gateway/payment-gateway.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller-auth', component: SellerAuthComponent },
  {
    path: 'seller-add-product',
    component: SellerAddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'seller-edit-product/:id',
    component: SellerEditProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'seller-home',
    component: SellerhomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
  },
  { path: 'user-auth', component: UserAuthComponent },
  {
    path: 'searchResults/:searchQuery',
    component: SearchResultsComponent,
  },
  {
    path: 'viewAll/:category',
    component: ViewAllComponent,
  },
  { path: 'cart', component: CartComponent },
  { path: 'checkout/payment-gateway', component:PaymentGatewayComponent},
  { path: '**', component: PagenotfoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
