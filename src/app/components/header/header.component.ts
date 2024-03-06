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
  menuType: String = 'default';

  ngOnInit(): void {
    this.router.events.subscribe((value : any) => {
      if (value.url){
        if(localStorage.getItem("seller") && value?.url?.includes('seller')) {
          this.menuType = 'seller';
          console.log('in seller',this.menuType);
        }else{
          this.menuType = 'default';
          console.log('out seller',this.menuType);
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
