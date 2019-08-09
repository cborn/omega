import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {PERMISSION_ROLE, SessionManagerService} from '../services/session-manager.service';


export class SuperAdminGuard implements CanActivate {

    constructor(private sessionManager: SessionManagerService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (!this.sessionManager.checkRoles(PERMISSION_ROLE.ROLE_SUPER_ADMIN)) {
            this.router.navigate(['/unauthorized']);
            return false;
        }

        return true;

    }

}

export class AdminGuard implements CanActivate {

    constructor(private sessionManager: SessionManagerService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (!this.sessionManager.checkRoles(PERMISSION_ROLE.ROLE_ADMIN)) {
            this.router.navigate(['/unauthorized']);
            return false;
        }

        return true;

    }

}


export class FacultyGuard implements CanActivate {

    constructor(private sessionManager: SessionManagerService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (!this.sessionManager.checkRoles(PERMISSION_ROLE.ROLE_FACULTY)) {
            this.router.navigate(['/unauthorized']);
            return false;
        }

        return true;

    }

}

export class GraderGuard implements CanActivate {

    constructor(private sessionManager: SessionManagerService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (!this.sessionManager.checkRoles(PERMISSION_ROLE.ROLE_GRADER)) {
            this.router.navigate(['/unauthorized']);
            return false;
        }

        return true;

    }

}


export class StudentGuard implements CanActivate {

    constructor(private sessionManager: SessionManagerService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (!this.sessionManager.checkRoles(PERMISSION_ROLE.ROLE_STUDENT)) {
            this.router.navigate(['/unauthorized']);
            return false;
        }

        return true;

    }

}
