import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ProductService } from '../../services/product.service';
import { Product } from '../../data-type';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {
    constructor(private productService: ProductService, private activatedRoute: ActivatedRoute){}
    
    productData: Product[] = [];
    searchQuery!: string;
    noResults = false;
    isLoading = false;
    numbers = [1,2,3,4];

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.searchQuery = params['searchQuery'];
            this.productService.searchProduct(this.searchQuery).subscribe(result => {
                this.productData = result.products;
                this.noResults = false;
                if (this.productData.length < 1){
                    this.noResults = true;
                }
            });
        })
    }
}
