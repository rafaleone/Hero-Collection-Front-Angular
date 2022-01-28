import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { HeroDetails } from 'src/app/_dto/response/Hero/hero-details';

@Injectable({
    providedIn: 'root'
})

export class HeroService {
    constructor(private http: HttpClient) {

    }
    private _backEnd_APIUrl = environment.backEnd_APIUrl;
    private endpointHeroController: string = 'Heroes';
    private endpointHeroesUser: string = 'GetUserHeroes';
    //api/User/GetUserDetail?userVallet=00X01


    getUserHeroesByWallet(_userWallet: string): Observable<HeroDetails[]> {
        const url: string = `${this._backEnd_APIUrl}/${this.endpointHeroController}/${this.endpointHeroesUser}`;
        let params = new HttpParams();
        let headers = new HttpHeaders();

        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Headers', '*');
        headers.append('Access-Control-Allow-Methods', 'GET');
        headers.append('Access-Control-Allow-Origin', '*');

        params = params.append('userWallet', _userWallet);

        //return this.http.get<any>(url, { params, headers: headers});
        return this.http.get<HeroDetails[]>(url, { params, headers: headers });
    }

    getHeroImage(_heroClassID: number, _heroRarityID: number, _enableImage: boolean = false): string {

        var imageMap = [
            {
                heroClassID: 1, //knight
                heroRarityID: 1, //Normal
                imgMap: "./assets/img/Knight_Normal.png"
            },
            {
                heroClassID: 1, //knight
                heroRarityID: 2, //Rare
                imgMap: "./assets/img/Knight_Rare.png"
            },
            {
                heroClassID: 1, //knight
                heroRarityID: 3, //Epic
                imgMap: "./assets/img/Knight_Epic.png"
            },
            {
                heroClassID: 1, //knight
                heroRarityID: 4, //Legendary
                imgMap: "./assets/img/Knight_Legendary.png"
            }
        ];

        var result = imageMap.find(x => x.heroClassID == _heroClassID && x.heroRarityID == _heroRarityID);

        if (result == null) {
            return "./assets/img/Unknow_Hero.png";
        }
        else {
            return result.imgMap
        }
    }

    getHeroTitle(_heroClassID: number, _heroRarityID: number): string {

        var heroTitle = [
            {
                heroClassID: 1, //knight
                heroRarityID: 1, //Normal
                heroTitle: "Normal Knight"
            },
            {
                heroClassID: 1, //knight
                heroRarityID: 2, //Rare
                heroTitle: "Rare Knight"
            },
            {
                heroClassID: 1, //knight
                heroRarityID: 3, //Epic
                heroTitle: "Epic Knight"
            },
            {
                heroClassID: 1, //knight
                heroRarityID: 4, //Legendary
                heroTitle: "Legendary Knight"
            }
        ];

        var result = heroTitle.find(x => x.heroClassID == _heroClassID && x.heroRarityID == _heroRarityID);

        if (result == null) {
            return "Hero";
        }
        else {
            return result.heroTitle
        }
    }
}