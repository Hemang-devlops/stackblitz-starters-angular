import { Component, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../app/data-type';

@Component({
  selector: 'app-product-details',
  // standalone: true,
  // imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router){}

  productData!: Product;
  productId !: number;
  isLoading = false;
  currentImage !: string;
  productQuantity : number = 1;
  inCart = false;
  cartData !: Product[];
  localCart = new EventEmitter<Product[]>();

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      const id = params.get('id');
      if (id){
        this.productId = parseInt(id);
      }
    })
    this.productService.getProduct(this.productId.toString()).subscribe(result => {
        this.productData = result;
        this.currentImage = result.thumbnail;
    });
    this.checkCart();
  }

  checkCart(){
    const localData = localStorage.getItem('localCart');
    if (this.productId && localData){
      this.cartData = JSON.parse(localData);
      let product = this.cartData.filter((item: Product) => this.productId === item.id);
      if (product.length){
        this.inCart = true;
      } else{
        this.inCart = false;
      }
    }
  }

  changeImage(image : string){
    this.currentImage = image;
  }

  handleQuantity(val: string){
    if (this.productQuantity){

    }
    this.productQuantity = val === 'increase' && this.productQuantity < 20 ? this.productQuantity + 1 : this.productQuantity > 1 ? this.productQuantity - 1 : 1; 
  }

  addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if (localStorage.getItem("user")){
        console.log(this.productData)
      } else{
        this.inCart = true;
        this.productService.localAddToCart(this.productData);
      }
    }
  }

  removeFromCart(){
    this.productService.removeItemFromCart(this.productId);
    this.inCart = false;
  }

  buyNow(){
    this.router.navigate([`/placeOrder/${this.productId}`])
  }
}
