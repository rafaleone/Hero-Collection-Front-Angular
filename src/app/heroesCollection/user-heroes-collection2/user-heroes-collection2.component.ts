import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroDetails } from 'src/app/_dto/response/Hero/hero-details';
import { HeroService } from 'src/app/_services/hero-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeroRarity } from 'src/app/_dto/response/Hero/hero-rarity';
import { HeroType } from 'src/app/_dto/response/Hero/hero-type';
import * as myGlobals from 'src/app/globals';
import Moralis from 'moralis'
import { environment } from 'src/environments/environment.prod';
import { HeroDetailModal } from '../user-heroes-collection/hero-detail-modal/hero-detail-modal.component';

@Component({
  selector: 'user-heroes-collection2',
  templateUrl: './user-heroes-collection2.component.html',
  styleUrls: ['./user-heroes-collection2.component.css'],
})


export class UserHeroesCollection2 implements OnInit {
  constructor(private heroService: HeroService, public dialog: MatDialog, private spinner: NgxSpinnerService) { }

  heroes: HeroDetails[] = [];
  heroesCardImgMap: string[][];
  tabSelectedIndex: number = 0;
  heroTypes: HeroType[] = [];
  heroRarities: HeroRarity[] = [];
  hideContent: boolean = false;


  ngOnInit(): void {
    this.spinner.show();

    this.heroService.getUserHeroesByWallet("128KZZ3XwMkgpd2cz3JCBwpwkXTKe3cMbd").subscribe(result => {
      result.forEach(hero => {
        this.heroes.push(hero)
      });

      this.heroService.getHeroesRarities().subscribe(result => {
        result.forEach(heroRarity => this.heroRarities.push(heroRarity))
      });

      this.heroService.getHeroesTypes().subscribe(result => {
        result.forEach(heroTypes => this.heroTypes.push(heroTypes))
      });

      //this.heroTypes[hero.type.id - 1].rarity[hero.rarity.id - 1].count += 1;
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);

      Moralis.start({ serverUrl: environment.moralis_serverUrl, appId: environment.moralis_appId });
    });


  };

  getHeroesAmount(heroType: number, heroRarity: number) {
    var result = this.heroes.filter(x => x.type.id == heroType).filter(y => y.rarity.id == heroRarity).length
    if (result == 0) {
      return "";
    }
    else {
      return result
    }
  }

  openHeroDetails(_heroType: number, _heroRarity: number): void {
    this.hideContent = true;
    const dialogRef = this.dialog.open(HeroDetailModal, {
      width: '750px',
      height: '660px',
      data: { heroes: this.heroes.filter(x => x.type.id == _heroType && x.rarity.id == _heroRarity) },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.hideContent = false;
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  getHeroImage(HeroTypeName: string, HeroRarityName: string): string {
    return `${myGlobals.heroesImgPath}/${HeroTypeName}_${HeroRarityName}${myGlobals.heroesImgExtension}`;
  }

  isOdd(num: number) {
    return Math.abs(num % 2) == 1;
  }
}