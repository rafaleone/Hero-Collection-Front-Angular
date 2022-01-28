import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { HeroDetails } from "src/app/_dto/response/Hero/hero-details";
import { HeroService } from "src/app/_services/hero-service";
import { HeroDetailModal } from "../user-heroes-collection/hero-detail-modal/hero-detail-modal.component";
import { SummonHeroModal } from "./summon-hero-modal/summon-hero-modal.component";

@Component({
  selector: 'store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})

export class Store implements OnInit {
  constructor(private spinner: NgxSpinnerService, public dialog: MatDialog,private heroService: HeroService) { }

  ngOnInit(): void {
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  
  btnSummonHero() {
    const dialogRef = this.dialog.open(SummonHeroModal, {
      width: '100%',
      panelClass: 'custom-dialog',
      //data: {  },
    });

    var heroes: HeroDetails[]=[];
    this.heroService.getUserHeroesByWallet("128KZZ3XwMkgpd2cz3JCBwpwkXTKe3cMbd").subscribe(result => {
     result.forEach(hero => heroes.push(hero));

   })

    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
         dialogRef.close();
         
        const heroDeailDialogRef = this.dialog.open(HeroDetailModal, {
          width: '750px',
          height: '660px',
          data: { heroes: heroes.filter(x => x.type.id == 1 && x.rarity.id == 4) },
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log(result);
        });

      }, 10000)
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}

