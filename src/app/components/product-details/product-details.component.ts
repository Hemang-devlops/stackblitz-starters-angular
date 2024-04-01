import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../app/data-type';

@Component({
  selector: 'app-product-details',
  // standalone: true,
  // imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute){}

  productData!: Product;
  productId: string | null = null;
  isLoading = false;
  currentImage !: string;
  productQuantity : number = 1;

    ngOnInit(): void {
        this.productId = this.activatedRoute.snapshot.paramMap.get('id');
        this.productService.getProduct(this.productId).subscribe(result => {
            this.productData = result;
            this.currentImage = result.thumbnail;
        });
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
        this.productService.localAddToCart(this.productData);
      }
    }
  }
}
