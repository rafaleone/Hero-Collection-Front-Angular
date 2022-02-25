import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { HeroDetails } from "src/app/_dto/response/Hero/hero-details";
import { HeroService } from "src/app/_services/hero-service";
import { HeroDetailModal } from "../user-heroes-collection/hero-detail-modal/hero-detail-modal.component";
import Moralis from 'moralis'


@Component({
  selector: 'store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})

export class Store implements OnInit {
  constructor(private spinner: NgxSpinnerService, public dialog: MatDialog, private heroService: HeroService) { }


  @ViewChild('coinsInput') coinsInput: ElementRef;
  @ViewChild('scrollsInput') scrollsInput: ElementRef;

  summonPortalImg = ["./assets/img/summon_portal_static.png", "./assets/img/summon_portal_animated.gif"];
  summonPortalImgIndex: number = 0;
  blink: boolean = false;
  userScrolls: number = 100

  ngOnInit(): void {
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  async btnSummonHero() {

    var heroes: HeroDetails[] = [];
    this.heroService.getUserHeroesByWallet("128KZZ3XwMkgpd2cz3JCBwpwkXTKe3cMbd").subscribe(result => {
      result.forEach(hero => heroes.push(hero));

      this.userScrolls -= 1;
      this.summonPortalImgIndex = 1;
      setTimeout(() => {
        this.summonPortalImgIndex = 0;
        this.blink = true;
        setTimeout(() => {
          this.summonPortalImgIndex = 0;
          this.blink = false;
          this.openHeroDialog(heroes.filter(x => x.type.id == 4 && x.rarity.id == 6));
        }, 200);
      }, 5600);
    });
  }


  openHeroDialog(hero: HeroDetails[]) {

    const heroDeailDialogRef = this.dialog.open(HeroDetailModal, {
      width: '750px',
      height: '660px',
      data: { heroes: hero },
    });

    heroDeailDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }


  btnBuyCoins() {
    let result = Moralis.transfer({ type: "native", amount: Moralis.Units.ETH(this.coinsInput.nativeElement.value), receiver: "0x60c5145d95b327B79Dad0e2dE10269DE04b0948e" })
  }

  btnBuyScrolls() {
    this.userScrolls += parseInt(this.scrollsInput.nativeElement.value);
    console.log(this.scrollsInput.nativeElement.value);
  }

  // btnSummonHero() {
  //   const dialogRef = this.dialog.open(SummonHeroModal, {
  //     width: '100%',
  //     panelClass: 'custom-dialog',
  //     //data: {  },
  //   });

  //   var heroes: HeroDetails[] = [];
  //   this.heroService.getUserHeroesByWallet("128KZZ3XwMkgpd2cz3JCBwpwkXTKe3cMbd").subscribe(result => {
  //     result.forEach(hero => heroes.push(hero));
  //   })

  //   dialogRef.afterOpened().subscribe(_ => {
  //     setTimeout(() => {
  //       dialogRef.close();

  //       const heroDeailDialogRef = this.dialog.open(HeroDetailModal, {
  //         width: '750px',
  //         height: '660px',
  //         data: { heroes: heroes.filter(x => x.type.id == 1 && x.rarity.id == 4) },
  //       });

  //       dialogRef.afterClosed().subscribe(result => {
  //         console.log('The dialog was closed');
  //         console.log(result);
  //       });

  //     }, 10000)
  //   })

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     console.log(result);
  //   });
  // }
}

