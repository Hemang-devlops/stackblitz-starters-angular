import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ProductService } from '../../services/product.service';
import { Product } from '../../app/data-type';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {
    productData: Product[] = [];
    constructor(private productService: ProductService, private activatedRoute: ActivatedRoute){}

    searchQuery: string | null = '';
    ngOnInit(): void {
        this.searchQuery = this.activatedRoute.snapshot.paramMap.get('id')
        this.productService.searchProduct(this.searchQuery).subscribe(result => {
            this.productData = result.products;
        });
    }
}
