import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {PERMISSION_ROLE, SessionManagerService} from '../session-manager.service';

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
