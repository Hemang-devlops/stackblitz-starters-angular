import { Component, OnInit } from '@angular/core';
import { Product, ResultList } from '../../app/data-type';
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
    numbers = [1,2,3,4];
    background = '';
    isLoading = false;


    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.popularProducts();
        this.menProducts();
        this.womenProducts();
        this.setBackground();
        this.accesProduct();
    }

    backgrounds = ['https://studybreaks.com/wp-content/uploads/2018/02/paris-mens-fashion-week-street-style-03.jpg', 'https://www.telegraph.co.uk/content/dam/fashion/2022/10/25/TELEMMGLPICT000313960470_trans_NvBQzQNjv4Bq7Cadr0IoOOfMS5GpRLWfGbVvz_IXZinEqtDTKahtjvc.jpeg', 'https://www.thestatesman.com/wp-content/uploads/2017/12/accessories.jpg'];


    setBackground() {
        this.background = this.backgrounds[0];
    }

    popularProducts(){
        this.isLoading = true;
        this.productService.popularProduct().subscribe((result: ResultList) => {
            if(result){
                this.productList = result.products;
                this.isLoading = false;
            } else{
                console.log(result);
            }
        });
    }

    accesProduct(){
        this.isLoading = true;
        this.productService.accesProduct().subscribe((result: ResultList) => {
        if(result){
            this.accesList = result.products;
            this.isLoading = false;
        } else{
            console.log(result);
        }
        });
    }
  
    menProducts(){
        this.isLoading = true;
        this.productService.menProduct().subscribe((result: ResultList) => {
        if(result){
            this.menProductList = result.products;
            this.isLoading = false;
        } else{
            console.log(result);
        }
        });
    }
  
    womenProducts(){
        this.isLoading = true;
        this.productService.womenProduct().subscribe((result: ResultList) => {
        if(result){
            this.womenProductList = result.products;
            this.isLoading = false;
        } else{
            console.log(result);
        }
        });
    }
}
