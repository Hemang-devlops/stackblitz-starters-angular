import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LogIn, SignUp } from '../../app/data-type';
import { SellerService } from '../../services/seller/seller.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent implements OnInit {
  constructor(private seller: SellerService, private router: Router) {}
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  showLogin = false;
  loginError = '';

  ngOnInit(): void {
    this.seller.reloadSeller().subscribe((isLoggedIn) => {
      this.isSellerLoggedIn.next(isLoggedIn);
      if (isLoggedIn) {
        this.router.navigate(['seller-home']);
      }
    });
  }

  signUp(data: SignUp): void {
    this.seller.sellerSignUp(data);
  }

  logIn(data: LogIn): void {
    this.seller.sellerLogIn(data);
    this.seller.isLoginError.subscribe((err) => {
      if (err) {
        this.loginError = 'Email or password is not correct.';
      }
    });
  }

  toggleLogin() {
    this.showLogin = !this.showLogin;
  }
}
