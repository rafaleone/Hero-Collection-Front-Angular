import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'summon-hero-modal',
  templateUrl: './summon-hero-modal.component.html',
  styleUrls: ['./summon-hero-modal.component.css']
})

export class SummonHeroModal implements OnInit {
  constructor(public dialogRef: MatDialogRef<SummonHeroModal>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {     }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }


}