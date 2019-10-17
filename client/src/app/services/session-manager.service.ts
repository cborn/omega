import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class SessionManagerService {


    static ACCESS_TOKEN = 'omega-access-token';
    static REFRESH_TOKEN = 'omega-refresh-token';
    static USERNAME = 'omega-username-token';
    static ROLES = 'omega-roles-token';
    static EXPIRES = 'omega-expires-token';

    displayTerm;


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
        return JSON.parse(localStorage.getItem(SessionManagerService.ROLES));
    }

    getExpires() {
        return localStorage.getItem(SessionManagerService.EXPIRES);
    }

    logout() {
        localStorage.removeItem(SessionManagerService.ACCESS_TOKEN);
        localStorage.removeItem(SessionManagerService.EXPIRES);
        localStorage.removeItem(SessionManagerService.ROLES);
        localStorage.removeItem(SessionManagerService.USERNAME);
        localStorage.removeItem(SessionManagerService.REFRESH_TOKEN);

    }


    setSessionToken(token) {
        return localStorage.setItem(SessionManagerService.ACCESS_TOKEN, token);
    }

    setRefreshToken(token) {
        return localStorage.setItem(SessionManagerService.REFRESH_TOKEN, token);
    }

    setUsername(username) {
        return localStorage.setItem(SessionManagerService.USERNAME, username);
    }

    setRoles(roles) {
        return localStorage.setItem(SessionManagerService.ROLES, JSON.stringify(roles));
    }

    setExpires(expires) {
        return localStorage.setItem(SessionManagerService.EXPIRES, expires);
    }

    /**
     * The way role checking works is based of a hierarchy basis. So if the person has a role of admin that means the can access the same as faculty or grader.
     * @param role
     */
    checkRoles(role: PERMISSION_ROLE) {

        const roles = this.getRoles();

        if (!roles) {
            return false;
        }

        if (roles.indexOf('ROLE_SUPER_ADMIN') > -1) {
            return true;
        } // You're a super admin, just go right ahead...

        switch (role) {
            case PERMISSION_ROLE.ROLE_ADMIN:
                return roles.indexOf('ROLE_ADMIN') > -1;
            case PERMISSION_ROLE.ROLE_FACULTY:
                return roles.indexOf('ROLE_FACULTY') > -1 || roles.indexOf('ROLE_ADMIN') > -1;
            case PERMISSION_ROLE.ROLE_GRADER:
                return roles.indexOf('ROLE_GRADER') > -1 || roles.indexOf('ROLE_FACULTY') > -1 || roles.indexOf('ROLE_ADMIN') > -1;
            case PERMISSION_ROLE.ROLE_STUDENT:
                return roles.indexOf('ROLE_STUDENT') > -1; // have we got any role? if we have then let us in because they can see this page no matter what.
            default :
                return false;


        }
    }


}

export enum PERMISSION_ROLE {

    ROLE_SUPER_ADMIN,
    ROLE_ADMIN,
    ROLE_FACULTY,
    ROLE_GRADER,
    ROLE_STUDENT

}
