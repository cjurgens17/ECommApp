import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  options: boolean = false;

  public showOptions(): void{
    const getShow = document.getElementById('burgerOptions') as HTMLElement;
    const menuBar = document.getElementById('menubar') as HTMLElement;

    this.options = !this.options;

    if (this.options) {
      getShow.classList.add('show');
      menuBar.style.display = 'none';
    }else {
      getShow.classList.remove('show');
    }

    this.options = !this.options;
  }

  public backToBurger(): void {
    const menuBar = document.getElementById('menubar') as HTMLElement;
    const getShow = document.getElementById('burgerOptions') as HTMLElement;
    // const screenWidth = window.innerWidth;

    // if(screenWidth < 900){
    //   menuBar.style.display = 'revert';
    // }else {
    //   menuBar.style.display = 'none';
    // }
    menuBar.style.display = 'revert';
    getShow.classList.remove('show');
  }
}
