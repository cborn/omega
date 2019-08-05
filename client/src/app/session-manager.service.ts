import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SessionManagerService {


    static ACCESS_TOKEN = 'omega-access-token';
    static REFRESH_TOKEN = 'omega-refresh-token';
    static USERNAME = 'omega-username-token';
    static ROLES = 'omega-roles-token';
    static EXPIRES = 'omega-expires-token';


    constructor() {
    }


    getSessionToken() {
        return localStorage.getItem(SessionManagerService.ACCESS_TOKEN);
    }

    getRefreshToken() {
        return localStorage.getItem(SessionManagerService.REFRESH_TOKEN);
    }

    getUsername() {
        return localStorage.getItem(SessionManagerService.USERNAME);
    }

    getRoles() {
        return localStorage.getItem(SessionManagerService.ROLES);
    }

    getExpires() {
        return localStorage.getItem(SessionManagerService.EXPIRES);
    }


}
