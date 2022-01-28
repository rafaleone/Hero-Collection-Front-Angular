import { ɵallowPreviousPlayerStylesMerge } from '@angular/animations/browser';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeroDetails } from 'src/app/_dto/response/Hero/hero-details';
import { HeroService } from 'src/app/_services/hero-service';

@Component({
  selector: 'hero-detail-modal',
  templateUrl: './hero-detail-modal.component.html',
  styleUrls: ['./hero-detail-modal.component.css']
})

export class HeroDetailModal implements OnInit {


  public heroImgMap: string = "";
  public heroTitle: string = "";
  public rarityClass: string = "";
  public heroes: HeroDetails[] = []
  public selectedOrder = 'idAsc';
  public currentIndex: number = 0;

  constructor(
    public dialogRef: MatDialogRef<HeroDetailModal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _heroService: HeroService
  ) { }

  ngOnInit(): void {
    (this.data.heroes as HeroDetails[]).forEach(hero => this.heroes.push(hero));

    this.heroImgMap = this._heroService.getHeroImage(this.heroes[0].type.id, this.heroes[0].rarity.id);
    this.heroTitle = this._heroService.getHeroTitle(this.heroes[0].type.id, this.heroes[0].rarity.id);

    switch (this.heroes[0].rarity.id) {
      case 1: {
        this.rarityClass = "rarity-normal";
        break;
      }
      case 2: {
        this.rarityClass = "rarity-rare";
        break;
      }
      case 3: {
        this.rarityClass = "rarity-epic";
        break;
      }
      case 4: {
        this.rarityClass = "rarity-legendary";
        break;
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeHero(direction: string) {

    if (direction == 'previous' && this.currentIndex > 0) {
      this.currentIndex -= 1;
    }
    else if (direction == 'next' && this.currentIndex < this.heroes.length) {
      this.currentIndex += 1;
    }
  }

  selectedOrderChange(optionValue: string) {
    switch (optionValue) {
      case 'pwrAsc':
      case 'pwrDesc': {
        var order: number[][];

        this.heroes.forEach(hero => {
          hero.totalPwr = hero.attrAttackSpeed + hero.attrDefense + hero.attrDistanceAttack + hero.attrHealthPoints + hero.attrMagicPower + hero.attrMeleAttack;
        });
        if(optionValue == "pwrAsc"){
          this.heroes = this.heroes.sort((a, b) => a.totalPwr.toString().localeCompare(b.totalPwr.toString()))
        } else if(optionValue == "pwrDesc"){
          this.heroes = this.heroes.sort((a, b) => b.totalPwr.toString().localeCompare(a.totalPwr.toString()))
        }
        break;
      }
      case 'idAsc': {
        this.heroes = this.heroes.sort((a, b) => a.id.toString().localeCompare(b.id.toString()))
        break;
      }
      case 'idDesc': {
        this.heroes = this.heroes.sort((a, b) => b.id.toString().localeCompare(a.id.toString()))
        break;
      }
    }
    this.currentIndex = 0;
  }
}