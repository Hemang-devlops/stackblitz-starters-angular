import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from '../services/seller/seller.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private sellerService: SellerService, private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('seller')) {
      return true;
    } else if (this.sellerService.isSellerLoggedIn) {
      console.log('if');
      this.router.navigate(['/seller/home']);
      return true;
    } else {
      console.log('else');
      this.router.navigate(['/seller/auth']);
      return false;
    }
  }
}
