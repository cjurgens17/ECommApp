import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private ngUnSubscribe = new Subject<void>();

  options: boolean = false;

  constructor(private router: Router){}

  public showOptions(): void{
    const getShow = document.getElementById('burgerOptions') as HTMLElement;
    const menuBar = document.getElementById('menubar') as HTMLElement;

    this.options = !this.options;

    if (this.options) {
      getShow.classList.add('show');
      menuBar.classList.add('hide');
    }else {
      getShow.classList.remove('show');
    }

    this.options = !this.options;
  }

  public backToBurger(): void {
    const getShow = document.getElementById('burgerOptions') as HTMLElement;
    const menuBar = document.getElementById('menubar') as HTMLElement;

    getShow.classList.remove('show');
    menuBar.classList.remove('hide');
  }


  //Lifecycle Hooks

  ngOnInit(): void {
    const nav = document.getElementById('nav') as HTMLElement;
    this.router.events
    .pipe(
      takeUntil(this.ngUnSubscribe)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd){
        const isHomePage = event.url === '/home';

        if(!isHomePage) {
          nav.classList.remove('transparent-bg');
        }else{
          nav.classList.add('transparent-bg');
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

}
