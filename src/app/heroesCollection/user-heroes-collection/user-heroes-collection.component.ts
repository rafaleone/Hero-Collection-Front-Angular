import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroDetails } from 'src/app/_dto/response/Hero/hero-details';
import { HeroService } from 'src/app/_services/hero-service';
import { HeroDetailModal } from './hero-detail-modal/hero-detail-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';



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

  heroTypes = [
    { id: 1, name: 'knight', displayName: 'Knight', rarity: [{ id: 1, name: 'normal', displayName: 'Normal', count: 0 }, { id: 2, name: 'rare', displayName: 'Rare', count: 0 }, { id: 3, name: 'epic', displayName: 'Epic', count: 0 }, { id: 4, name: 'legendary', displayName: 'Legendary', count: 0 }] },
    { id: 2, name: 'ranger', displayName: 'Ranger', rarity: [{ id: 1, name: 'normal', displayName: 'Normal', count: 0 }, { id: 2, name: 'rare', displayName: 'Rare', count: 0 }, { id: 3, name: 'epic', displayName: 'Epic', count: 0 }, { id: 4, name: 'legendary', displayName: 'Legendary', count: 0 }] },
    { id: 3, name: 'priest', displayName: 'Priest', rarity: [{ id: 1, name: 'normal', displayName: 'Normal', count: 0 }, { id: 2, name: 'rare', displayName: 'Rare', count: 0 }, { id: 3, name: 'epic', displayName: 'Epic', count: 0 }, { id: 4, name: 'legendary', displayName: 'Legendary', count: 0 }] },
    { id: 4, name: 'mage', displayName: 'Mage', rarity: [{ id: 1, name: 'normal', displayName: 'Normal', count: 0 }, { id: 2, name: 'rare', displayName: 'Rare', count: 0 }, { id: 3, name: 'epic', displayName: 'Epic', count: 0 }, { id: 4, name: 'legendary', displayName: 'Legendary', count: 0 }] },
    { id: 5, name: 'barbarian', displayName: 'Barbarian', rarity: [{ id: 1, name: 'normal', displayName: 'Normal', count: 0 }, { id: 2, name: 'rare', displayName: 'Rare', count: 0 }, { id: 3, name: 'epic', displayName: 'Epic', count: 0 }, { id: 4, name: 'legendary', displayName: 'Legendary', count: 0 }] },
    { id: 6, name: 'rogue', displayName: 'Rogue', rarity: [{ id: 1, name: 'normal', displayName: 'Normal', count: 0 }, { id: 2, name: 'rare', displayName: 'Rare', count: 0 }, { id: 3, name: 'epic', displayName: 'Epic', count: 0 }, { id: 4, name: 'legendary', displayName: 'Legendary', count: 0 }] }];

  ngOnInit(): void {
    this.spinner.show();

    this.mapHeroCardImg();

    this.heroService.getUserHeroesByWallet("128KZZ3XwMkgpd2cz3JCBwpwkXTKe3cMbd").subscribe(result => {
      result.forEach(hero => {
        this.heroes.push(hero)
        this.heroTypes[hero.type.id - 1].rarity[hero.rarity.id - 1].count += 1;
      });


      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    });

  };

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
    if (this.tabSelectedIndex != this.heroTypes.length-1) {
      this.tabSelectedIndex = this.tabSelectedIndex + 1;
    }
  }

  previousStep() {
    if (this.tabSelectedIndex != 0) {
      this.tabSelectedIndex = this.tabSelectedIndex - 1;
    }
  }

  mapHeroCardImg() {
    this.heroesCardImgMap = [
      [],
      ["", "./assets/img/Knight_Normal.png", "./assets/img/Knight_Rare.png", "./assets/img/Knight_Epic.png", "./assets/img/Knight_Legendary.png"],
      ["", "./assets/img/Unknow_Hero.png", "./assets/img/Unknow_Hero.png", "./assets/img/Unknow_Hero.png", "./assets/img/Unknow_Hero.png"],
      ["", "./assets/img/Unknow_Hero.png", "./assets/img/Unknow_Hero.png", "./assets/img/Unknow_Hero.png", "./assets/img/Unknow_Hero.png"],
      ["", "./assets/img/Unknow_Hero.png", "./assets/img/Unknow_Hero.png", "./assets/img/Unknow_Hero.png", "./assets/img/Unknow_Hero.png"],
      ["", "./assets/img/Unknow_Hero.png", "./assets/img/Unknow_Hero.png", "./assets/img/Unknow_Hero.png", "./assets/img/Unknow_Hero.png"],
      ["", "./assets/img/Unknow_Hero.png", "./assets/img/Unknow_Hero.png", "./assets/img/Unknow_Hero.png", "./assets/img/Unknow_Hero.png"],
    ];
  }

  isOdd(num: number) {
    return Math.abs(num % 2) == 1;
  }
}