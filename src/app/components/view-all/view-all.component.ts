import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ProductService } from '../../services/product.service';
import { Product, ResultList } from '../../app/data-type';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.css'
})
export class ViewAllComponent implements OnInit {
  cartData: any;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router) { }

  productData: Product[] = [];
  category!: string;
  noResults = false;
  isLoading = false;
  numbers = [1, 2, 3, 4];
  showCategory !: string;
  inCart = false;
  product !: Product;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.category = params['category'];
      if (this.category === 'trendyProducts') {
        this.getTrendyProduct();
      } else if (this.category === 'menFashion'){
        this.getMenProducts();
      } else if (this.category === 'womenFashion'){
        this.getWomenProducts();
      } else if(this.category === 'assessories'){
        this.getAssessProducts();
      } else{
        this.showCategory = this.category;
        this.productService.categoryProduct(true, this.category).subscribe((result: ResultList) => {
          if (result) {
            this.productData = result.products;
            this.noResults = false;
            if (this.productData.length < 1) {
              this.noResults = true;
            }
          }
        });
      }
    })
  }

  addToCart(product: Product) {
    if (product.quantity){
        product.quantity = product.quantity ?? 0;
        product.quantity += 1;
    } else{
        product.quantity = 1
    }
    if (product) {
        if (localStorage.getItem("user")) {
            console.log(product)
        } else {
            this.productService.localAddToCart(product);
        }
    }
  }

  buyNow(product : Product){
    this.router.navigate([`/placeOrder/${product.id}`])
  }

  getTrendyProduct(){
    this.showCategory = 'Trendy Products';
      this.productService.popularProduct(true).subscribe((result: ResultList) => {
        if (result) {
          this.productData = result.products;
          this.noResults = false;
          if (this.productData.length < 1) {
            this.noResults = true;
          }
        }
      });
  }

  getMenProducts(style ?: string){
    this.showCategory = "Men's Fashion";
    this.productService.menProduct(true, style).subscribe((result: ResultList) => {
      if (result) {
        this.productData = result.products;
        this.noResults = false;
        if (this.productData.length < 1) {
          this.noResults = true;
        }
      }
    });
  }

  getWomenProducts(style ?: string){
    this.showCategory = "Women's Fashion";
      this.productService.womenProduct(true, style).subscribe((result: ResultList) => {
        if (result) {
          this.productData = result.products;
          this.noResults = false;
          if (this.productData.length < 1) {
            this.noResults = true;
          }
        }
      });
  }

  getAssessProducts(style ?: string){
    this.showCategory = "Assessories";
      this.productService.assesProduct(true, style).subscribe((result: ResultList) => {
        if (result) {
          this.productData = result.products;
          this.noResults = false;
          if (this.productData.length < 1) {
            this.noResults = true;
          }
        }
      });
  }
}
