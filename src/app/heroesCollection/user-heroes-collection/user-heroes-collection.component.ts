import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroDetails } from 'src/app/_dto/response/Hero/hero-details';
import { HeroService } from 'src/app/_services/hero-service';
import { HeroDetailModal } from './hero-detail-modal/hero-detail-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeroRarity } from 'src/app/_dto/response/Hero/hero-rarity';
import { HeroType } from 'src/app/_dto/response/Hero/hero-type';
import * as myGlobals from 'src/app/globals';

@Component({
  selector: 'user-heroes-collection',
  templateUrl: './user-heroes-collection.component.html',
  styleUrls: ['./user-heroes-collection.component.css'],
})


export class UserHeroesCollection implements OnInit {
  constructor(private heroService: HeroService, public dialog: MatDialog, private spinner: NgxSpinnerService) { }

  heroes: HeroDetails[] = [];
  heroesCardImgMap: string[][];
  tabSelectedIndex: number = 0;
  heroTypes: HeroType[] = [];
  heroRarities: HeroRarity[] = [];

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
    const dialogRef = this.dialog.open(HeroDetailModal, {
      width: '750px',
      height: '660px',
      data: { heroes: this.heroes.filter(x => x.type.id == _heroType && x.rarity.id == _heroRarity) },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  nextStep() {
    if (this.tabSelectedIndex != this.heroTypes.length - 1) {
      this.tabSelectedIndex = this.tabSelectedIndex + 1;
    }
  }

  previousStep() {
    if (this.tabSelectedIndex != 0) {
      this.tabSelectedIndex = this.tabSelectedIndex - 1;
    }
  }


  getHeroImage(HeroTypeName: string, HeroRarityName: string): string {
    return `${myGlobals.heroesImgPath}/${HeroTypeName}_${HeroRarityName}${myGlobals.heroesImgExtension}`;
  }

  // isOdd(num: number) {
  //   return Math.abs(num % 2) == 1;
  // }
}