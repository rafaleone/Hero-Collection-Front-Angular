import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) {

    }
    private _backEnd_APIUrl = environment.backEnd_APIUrl;
    private endpointUserController: string = 'User';
    private endpointUserDetails: string = 'GetUserDetail';
    //https://99vq3hg4l9.execute-api.sa-east-1.amazonaws.com/Prod/api/User/GetUserDetail?userVallet=00X01

    getUserDetails(userVallet:string) {
        const url: string = `${this._backEnd_APIUrl}/${this.endpointUserController}/${this.endpointUserDetails}`;
        let params = new HttpParams();
        let headers = new HttpHeaders();

         headers.append('Content-Type', 'application/json');
         headers.append('Access-Control-Allow-Headers', '*');
         headers.append('Access-Control-Allow-Methods', 'GET');
         headers.append('Access-Control-Allow-Origin', '*');

        params = params.append('userVallet',userVallet);

        //return this.http.get<any>(url, { params, headers: headers});
         return this.http.get<any>(url, { params, headers: headers, responseType: 'text' as 'json' });
    }
}