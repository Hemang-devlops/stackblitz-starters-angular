import { Component, OnInit } from '@angular/core';
import { Product } from '../../app/data-type';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  productList: Product[] = [];
  menProductList: Product[] = [];
  womenProductList: Product[] = [];
  accesList : Product[] = [];
  background = '';


  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.popularProducts();
    this.menProducts();
    this.womenProducts();
    this.setBackground();
    this.accesProduct();
  }

  backgrounds = ['https://www.thetrendspotter.net/wp-content/uploads/2017/01/Best-Clothing-Stores-men.jpg', 'https://www.telegraph.co.uk/content/dam/fashion/2022/10/25/TELEMMGLPICT000313960470_trans_NvBQzQNjv4Bq7Cadr0IoOOfMS5GpRLWfGbVvz_IXZinEqtDTKahtjvc.jpeg', 'https://www.thestatesman.com/wp-content/uploads/2017/12/accessories.jpg'];


  setBackground() {
    this.background = this.backgrounds[0];
    console.log(this.background);
  }

  popularProducts(){
    this.productService.popularProduct().subscribe((result: Product[]) => {
      if(result){
        this.productList = result;
      } else{
        console.log(result);
      }
    });
  }

  accesProduct(){
    this.productService.accesProduct().subscribe((result: Product[]) => {
      if(result){
        this.accesList = result;
      } else{
        console.log(result);
      }
    });
  }
  
  menProducts(){
    this.productService.menProduct().subscribe((result: Product[]) => {
      if(result){
        this.menProductList = result;
      } else{
        console.log(result);
      }
    });
  }
  
  womenProducts(){
    this.productService.womenProduct().subscribe((result: Product[]) => {
      if(result){
        this.womenProductList = result;
      } else{
        console.log(result);
      }
    });
  }
}
