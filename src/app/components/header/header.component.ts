import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  // imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router){}
  menuType: string = 'default';
  sellerName: string = '';

  ngOnInit(): void {
    this.router.events.subscribe((value : any) => {
      if (value.url){
        if(localStorage.getItem("seller") && value?.url?.includes('seller')) {
          this.menuType = 'seller';
          if (localStorage.getItem("seller")){
            let sellerStore = localStorage.getItem("seller");
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        }else{
          this.menuType = 'default';
        }
      }
    })
  }

  logoutSeller(): void{
    if (localStorage.getItem("seller")){
      localStorage.setItem("seller", "");
      this.router.navigate(["/"]);
    }
  }
}
