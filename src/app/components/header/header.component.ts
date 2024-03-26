import { Location } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../services/product.service';
import { Product } from '../../app/data-type';

@Component({
  selector: 'app-header',
  // imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router, private location: Location, private productService: ProductService) { }

  screenWidth: number = 0;
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  bar = faBars;
  mobileNav = false;
  cross = faXmark;
  showNav = 'top';
  lastScrollY = 0;
  searchProductData: Product[] = [];
  showCategories = false;
  categoryList = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting"
  ]


  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.location.onUrlChange((url: string) => {
      this.mobileNav = false;
    })

    this.screenWidth = window.innerWidth;
    this.router.events.subscribe((value: any) => {
      if (value.url) {
        if (localStorage.getItem("seller") && value?.url?.includes('seller')) {
          let sellerStore = localStorage.getItem("seller");
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
          }
        else if (localStorage.getItem("user")) {
          console.log('user');
          let userStore = localStorage.getItem("user");
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData[0].name;
          console.log(this.userName, 'user');
          this.menuType = 'user';
        } else {
          this.menuType = 'default';
        }
      }
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 760) {
      this.mobileNav = false;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 200) {
      if (currentScrollY > this.lastScrollY) {
        this.showNav = 'hide';
      } else {
        this.showNav = 'show';
      }
    } else {
      this.showNav = 'top';
    }
    this.lastScrollY = currentScrollY;
  }

  toggleMobileMenu() {
    this.mobileNav = !this.mobileNav;
  }

  logoutSeller(): void {
    if (localStorage.getItem("seller")) {
      localStorage.setItem("seller", "");
      this.router.navigate(["/"]);
    }
  }

  logoutUser(): void {
    if (localStorage.getItem("user")) {
      localStorage.setItem("user", "");
      this.router.navigate(["/"]);
    }
  }

  searchProducts(query: KeyboardEvent) {
    if (MediaQueryListEvent) {
      const element = query.target as HTMLInputElement;
      // console.log(element.value);
      this.productService.searchProduct(element.value).subscribe(result => {
        this.searchProductData = result.products;
      });
    }
  }

  toggleCategories() {
    console.log('clicked');
    this.mobileNav = this.mobileNav ? !this.mobileNav : this.mobileNav;
    this.showCategories = !this.showCategories;
  }
}
