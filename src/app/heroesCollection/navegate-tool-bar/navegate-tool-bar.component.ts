import { Component } from '@angular/core';
import { UserService } from 'src/app/_services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'navegate-tool-bar',
  templateUrl: './navegate-tool-bar.component.html',
  styleUrls: ['./navegate-tool-bar.component.css']
})

export class NavegateToolBar {
  constructor(
    private userService: UserService,
    private router: Router) { };

  public hideSideNavBar = true;

  showSideNavBar() {
    this.hideSideNavBar = !this.hideSideNavBar;
  }

  btnHome(){
    this.router.navigate(['Home'])
  }

  btnConnectWallet() {

  }

  btnCollection(){
    this.router.navigate(['UserHeroesCollection'])
  }

  btnStore(){
    this.router.navigate(['Store'])
  }
}