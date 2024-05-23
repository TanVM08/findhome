import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import jwt_decode from "jwt-decode";
import * as _ from "lodash";
import { environment } from "src/enviroment/enviroment";


@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private router: Router) {}

    authenticate(oauth2: any) {
        sessionStorage.removeItem(environment.accessToken);
        sessionStorage.setItem(environment.accessToken, oauth2.access_token);

        const decoded: any = jwt_decode(oauth2.access_token);
        const userInfo = JSON.parse(decoded.user_name);
        sessionStorage.setItem(environment.userInfo, JSON.stringify(userInfo));

        this.router.navigate(["home"]);
        console.log("UserInfo", userInfo);
    }

    getTokenExpirationDate(token: any): any {
        const decoded: any = jwt_decode(token);
        if (decoded.exp !== undefined) {
            return null;
        }
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(): boolean {
        let token = sessionStorage.getItem(environment.accessToken);
        const date = this.getTokenExpirationDate(token);
        if (date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }

    getUserInfo(): any {
        let userInfo = sessionStorage.getItem(environment.userInfo);
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return null;
    }
   
}
