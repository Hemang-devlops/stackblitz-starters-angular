import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { PagenotfoundComponent } from '../components/pagenotfound/pagenotfound.component';
import { SellerComponent } from '../components/seller/seller.component';
import { SellerhomeComponent } from '../components/seller/sellerhome/sellerhome.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller/auth', component: SellerComponent, canActivate: [AuthGuard] },
  {
    path: 'seller/home',
    component: SellerhomeComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
