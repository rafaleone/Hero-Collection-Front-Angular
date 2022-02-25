import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { HeroDetails } from 'src/app/_dto/response/Hero/hero-details';
import { HeroType } from "../_dto/response/Hero/hero-type";
import { HeroRarity } from "../_dto/response/Hero/hero-rarity";

@Injectable({
    providedIn: 'root'
})

export class HeroService {
    constructor(private http: HttpClient) {

    }
    private _backEnd_APIUrl = environment.backEnd_APIUrl;
    private endpointHeroController: string = 'Heroes';
    private endpointHeroesUser: string = 'GetUserHeroes';
    private endpointHeroesTypes: string = 'GetHeroesTypes';
    private endpointHeroesRarities: string = 'GetHeroesRarities';
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

    getHeroesTypes(): Observable<HeroType[]> {
        const url: string = `${this._backEnd_APIUrl}/${this.endpointHeroController}/${this.endpointHeroesTypes}`;
        let params = new HttpParams();
        let headers = new HttpHeaders();

        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Headers', '*');
        headers.append('Access-Control-Allow-Methods', 'GET');
        headers.append('Access-Control-Allow-Origin', '*');


        //return this.http.get<any>(url, { params, headers: headers});
        return this.http.get<HeroType[]>(url, { params, headers: headers });
    }

    getHeroesRarities(): Observable<HeroRarity[]> {
        const url: string = `${this._backEnd_APIUrl}/${this.endpointHeroController}/${this.endpointHeroesRarities}`;
        let params = new HttpParams();
        let headers = new HttpHeaders();

        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Headers', '*');
        headers.append('Access-Control-Allow-Methods', 'GET');
        headers.append('Access-Control-Allow-Origin', '*');


        //return this.http.get<any>(url, { params, headers: headers});
        return this.http.get<HeroRarity[]>(url, { params, headers: headers });
    }
}