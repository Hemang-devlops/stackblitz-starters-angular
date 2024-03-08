import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { PagenotfoundComponent } from '../components/pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from '../components/login/login.component';
import { SellerAuthComponent } from '../components/seller-auth/seller-auth.component';
import { SellerhomeComponent } from '../components/seller-auth/sellerhome/sellerhome.component';
import { SellerAddProductComponent } from '../components/seller-auth/seller-add-product/seller-add-product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller-auth', component: SellerAuthComponent},
  { 
    path: 'seller-add-product', 
    component: SellerAddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'seller-home',
    component: SellerhomeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'user-login', component: LoginComponent},
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
