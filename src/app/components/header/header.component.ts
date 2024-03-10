import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {faBars, faXmark} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  // imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router){}
  screenWidth: number = 0;
  menuType: string = 'default';
  sellerName: string = '';
  bar = faBars;
  show=false;
  cross = faXmark;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth > 760){
      this.show = false;
    }
  }

  toggleMobileMenu() {
    this.show=!this.show;
  }

  logoutSeller(): void{
    if (localStorage.getItem("seller")){
      localStorage.setItem("seller", "");
      this.router.navigate(["/"]);
    }
  }
}
