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

  productData: Product | undefined;
  productId: string | null = null;
  isLoading = false;
  currentImage : string | undefined;
  productQuantity : number = 1;

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.productId);
    this.productService.getProduct(this.productId).subscribe(result => {
      this.productData = result.products[0];
      this.currentImage = result.products[0].thumbnail;
      console.log(this.productData);
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
}
