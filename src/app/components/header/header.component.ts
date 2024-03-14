import { Location } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {faBars, faXmark} from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../services/product.service';
import { Product } from '../../app/data-type';

@Component({
  selector: 'app-header',
  // imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router, private location: Location, private productService: ProductService){}

  screenWidth: number = 0;
  menuType: string = 'default';
  sellerName: string = '';
  bar = faBars;
  mobileNav=false;
  cross = faXmark;
  showNav = 'top';
  lastScrollY = 0;
  searchProductData : Product[] = [];

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.screenWidth = window.innerWidth;
    this.router.events.subscribe((value : any) => {
      if (value.url){
        if(localStorage.getItem("seller") && value?.url?.includes('seller')) {
          this.menuType = 'seller';
          if (localStorage.getItem("seller")){
            let sellerStore = localStorage.getItem("seller");
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        }else{
          this.menuType = 'default';
        }
      }
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth > 760){
      this.mobileNav = false;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const currentScrollY = window.scrollY;
    if (currentScrollY > 200){
      if (currentScrollY > this.lastScrollY){
        this.showNav = 'hide';
      } else{
        this.showNav = 'show';
      }
    } else {
      this.showNav = 'top';
    }
    this.lastScrollY = currentScrollY;
  }

  toggleMobileMenu() {
    this.mobileNav=!this.mobileNav;
  }

  logoutSeller(): void{
    if (localStorage.getItem("seller")){
      localStorage.setItem("seller", "");
      this.router.navigate(["/"]);
    }
  }

  searchProducts(query: KeyboardEvent){
    if (MediaQueryListEvent){
      const element = query.target as HTMLInputElement;
      // console.log(element.value);
      this.productService.searchProduct(element.value).subscribe( result => {
        this.searchProductData = result;
      });
    }
  }
}
