import {Component, OnInit} from '@angular/core';
import {NavService} from '../nav/nav.service';
import {Route, Router} from '@angular/router';

import {environment} from '../../environments/environment';
import {PERMISSION_ROLE, SessionManagerService} from '../services/session-manager.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    controllers: Array<any>;
    serverUrl: string;

    constructor(private sessionManager: SessionManagerService, private router: Router) {
    }

    ngOnInit(): void {

        if (this.sessionManager.checkRoles(PERMISSION_ROLE.ROLE_GRADER)) {
            this.router.navigate(['/faculty/index']);
        } else {
            this.router.navigate(['/student/index']);
        }


    }


}
