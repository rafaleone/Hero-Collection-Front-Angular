import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/_services/user-service';
import { Router } from '@angular/router';
import Moralis from 'moralis'
import { environment } from 'src/environments/environment.prod';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'navegate-tool-bar',
  templateUrl: './navegate-tool-bar.component.html',
  styleUrls: ['./navegate-tool-bar.component.css']
})

export class NavegateToolBar implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  defaultWalletButtonText: string = "Connect your wallet!";
  walletButtonText: string;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  

  ngOnInit(): void {
    Moralis.start({ serverUrl: environment.moralis_serverUrl, appId: environment.moralis_appId });
    this.walletButtonText = this.defaultWalletButtonText;
  }

  public hideSideNavBar = true;

  showSideNavBar() {
    this.hideSideNavBar = !this.hideSideNavBar;
    if (this.hideSideNavBar) {this.sidenav.close()};
    console.log(this.hideSideNavBar)
  }

  btnHome() {
    this.router.navigate(['Home'])
  }

  async btnConnectWallet() {
    await Moralis.authenticate()
      .then((user) => {
        const userAddress = user.get("ethAddress");
        const userName = user.get("username");
        const token = user.get('sessionToken');
        console.log('userAddress', userAddress)
        console.log('userName', userName)
        console.log('token', token)
        this.walletButtonText = userAddress.substring(0, 15) + '...'
      })
  }

  btnCollection() {
    this.router.navigate(['UserHeroesCollection'])
  }

  btnCollection2() {
    this.router.navigate(['UserHeroesCollection2'])
  }

  btnStore() {
    this.router.navigate(['Store'])
  }
}