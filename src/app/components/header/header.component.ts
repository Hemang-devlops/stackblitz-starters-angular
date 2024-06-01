import { Location } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../services/product.service';
import { Product, ResultList } from '../../app/data-type';

@Component({
  selector: 'app-header',
  // imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(
    public router: Router,
    private location: Location,
    private productService: ProductService
  ) {}

  screenWidth: number = 0
  menuType: string = 'default'
  sellerName: string = ''
  userName: string = ''
  bar = faBars
  mobileNav = false
  cross = faXmark
  showNav = 'top'
  lastScrollY = 0
  searchProductData: Product[] = []
  showCategories = false
  categoryList = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches"
  ];
  searchQuery : string = '';
  cartItems : number = 0;

  ngOnInit(): void {
    window.scrollTo(0, 0)
    
    this.location.onUrlChange((url: string) => {
      this.mobileNav = false
    })

    this.screenWidth = window.innerWidth
    this.router.events.subscribe((value: any) => {
      if (value.url) {
        if (localStorage.getItem('seller') && value?.url?.includes('seller')) {
          let sellerStore = localStorage.getItem('seller')
          let sellerData = sellerStore && JSON.parse(sellerStore)[0]
          this.sellerName = sellerData.name
          this.menuType = 'seller'
        } else if (localStorage.getItem('user')) {
          console.log('user')
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore)
          this.userName = userData[0].name
          console.log(this.userName, 'user')
          this.menuType = 'user'
        } else {
          this.menuType = 'default'
        }
      }
    })

    let cartData = localStorage.getItem('localCart');
    if (cartData){
      this.cartItems = JSON.parse(cartData).length;
    }
    this.productService.cartData.subscribe(items => {
      this.cartItems = items.length;
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth
    if (this.screenWidth > 760) {
      this.mobileNav = false
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const currentScrollY = window.scrollY
    if (currentScrollY > 200) {
      if (currentScrollY > this.lastScrollY) {
        this.showNav = 'hide'
      } else {
        this.showNav = 'show'
      }
    } else {
      this.showNav = 'top'
    }
    this.lastScrollY = currentScrollY
  }

  toggleMobileMenu() {
    this.mobileNav = !this.mobileNav
  }

  logoutSeller(): void {
    if (localStorage.getItem('seller')) {
      localStorage.setItem('seller', '')
      this.router.navigate(['/'])
    }
  }

  logoutUser(): void {
    if (localStorage.getItem('user')) {
      localStorage.setItem('user', '')
      this.router.navigate(['/'])
    }
  }

  searchProducts(query: KeyboardEvent) {
    if (MediaQueryListEvent) {
      const element = query.target as HTMLInputElement
      // console.log(element.value);
      this.searchQuery = element.value;
      if (this.searchQuery) {
        this.productService.searchProduct(this.searchQuery).subscribe((result) => {
          this.searchProductData = result.products
        })
      } else {
        this.searchProductData = []
      }
    }
  }

    toggleCategories() {
        console.log('clicked')
        this.mobileNav = this.mobileNav ? !this.mobileNav : this.mobileNav
        this.showCategories = !this.showCategories
    }

    clickSearchResult(id: number) {
        this.router.navigate([`/product/${id}`])
        this.searchProductData = []
    }

    hideSearch() {
        this.searchProductData = [];
    }

    searchResults(){
        if (this.searchQuery.length > 0) {
            this.router.navigate([`searchResults/${this.searchQuery}`])
        }
    }


    categoryProducts(category : string){
      this.router.navigate([`/viewAll/${category}`]);
      this.showCategories = !this.showCategories
    }
}
