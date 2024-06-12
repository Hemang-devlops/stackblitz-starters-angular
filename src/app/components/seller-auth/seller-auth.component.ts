import { Component } from '@angular/core';
import { LogIn, SignUp } from '../../data-type';
import { SellerService } from '../../services/seller.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
  constructor(private seller: SellerService, private router: Router) {}
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  showLogin = false;
  formError = '';
  passwordIns = true;
  passwordMinLength = 8;


  ngOnInit(): void {
    this.seller.reloadSeller().subscribe((isLoggedIn) => {
      this.isSellerLoggedIn.next(isLoggedIn);
      if (isLoggedIn) {
        this.router.navigate(['seller-home']);
      }
    });
  }

  toggleLogin() {
    this.showLogin = !this.showLogin;
  }


  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return passwordRegex.test(password);
  }

  passwordsMatch(data: SignUp): boolean {
    return data.password === data.cpassword;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateSignup(data: SignUp){
    const isValidPassword = this.validatePassword(data.password);
    const isValidEmail = this.validateEmail(data.email);
    if(!data?.email && !data?.name && !data?.password && !data?.cpassword){
      this.formError = 'All the fields are mandatory';
      return false;
    }
    else if(!data.name){
      this.formError = 'Name cannot be empty';
      return false;
    }
    else if(!data.email){
      this.formError = 'Email cannot be empty';
      return false;
    } else if (!isValidEmail){
      this.formError = 'Email is not valid';
      return false;
    }
    else if(!data.password){
      this.passwordIns = true;
      this.formError = 'Password cannot be empty';
      return false;
    }
    else if(data.password.length < this.passwordMinLength){
      this.passwordIns = true;
      this.formError = 'Password must be at least 8 characters long.';
      return false;
    } else if(!isValidPassword){
      this.passwordIns = true;
      this.formError = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
      return false;
    }
    else if(!data.cpassword){
      this.passwordIns = false;
      this.formError = 'Please confirm your Password.';
      return false;
    }
    else if(!this.passwordsMatch(data)){
      this.formError = "The entered passwords don't match. Please try again.";
      return false;
    }
    return true;
  }
  signUp(data : SignUp){
    return this.validateSignup(data) ? 
    this.seller.sellerSignUp(data) : false;
    setTimeout(() => this.formError = "", 3000);
  }

  logIn(data: LogIn){
    if(data.email === "" && data.password === ""){
        this.formError = 'Email and password cannot be empty';
        return;
    }
    else if(data.email === ""){
      this.formError = 'Email cannot be empty';
      return;
    }
    else if(data.password === ""){
      this.formError = 'Password cannot be empty';
      return;
    }
    this.seller.sellerLogIn(data);
    this.seller.isLoginError.subscribe((err) => {
      if (err) {
        this.formError = 'Email or password is not correct.';
      }
    });
    setTimeout(() => this.formError = "", 3000);
  }

}
