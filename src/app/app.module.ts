import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavegateToolBar } from './heroesCollection/navegate-tool-bar/navegate-tool-bar.component';
import { UserHeroesCollection } from './heroesCollection/user-heroes-collection/user-heroes-collection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { Home } from './heroesCollection/home/home.component';
import { HeroDetailModal } from './heroesCollection/user-heroes-collection/hero-detail-modal/hero-detail-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Store } from './heroesCollection/store/store.component';
import { SummonHeroModal } from './heroesCollection/store/summon-hero-modal/summon-hero-modal.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTabsModule} from '@angular/material/tabs'
import { UserHeroesCollection2 } from './heroesCollection/user-heroes-collection2/user-heroes-collection2.component';
import {MatInputModule} from '@angular/material/input';
import { PlayButton } from './sharedComponents/play-button/play-button.component';

@NgModule({
  declarations: [
    AppComponent,
    Home,
    NavegateToolBar,
    UserHeroesCollection,
    HeroDetailModal,
    Store,
    SummonHeroModal,
    UserHeroesCollection2,
    PlayButton
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    MatSelectModule,
    NgxSpinnerModule,
    MatBadgeModule,
    MatTabsModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
