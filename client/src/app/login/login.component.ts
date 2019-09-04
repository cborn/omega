import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {PERMISSION_ROLE, SessionManagerService} from '../services/session-manager.service';
import {NotificationService} from '../services/notification.service';
import {AuthenticatedHttpClient} from '../services/authenticated-http-service.service';

export class LoginResponse {


    username: string;
    roles: string[];
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;


}


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private router: Router, private http: HttpClient, private authHttp: AuthenticatedHttpClient, private sessionManager: SessionManagerService, private notificationService: NotificationService) {
    }


    username: string;
    password: string;

    showSpinner = false;

    ngOnInit() {
    }

    login(): void {
        this.showSpinner = true;
        const loginPackage = {
            username: this.username,
            password: this.password
        };


        this.http.post<LoginResponse>(AuthenticatedHttpClient.AUTH_URL, loginPackage).subscribe(value => {
            this.showSpinner = false;
            this.sessionManager.setSessionToken(value.access_token);
            this.sessionManager.setExpires(value.expires_in);
            this.sessionManager.setRefreshToken(value.refresh_token);
            this.sessionManager.setRoles(value.roles);
            this.sessionManager.setUsername(value.username);

            if (this.authHttp.resumeRoute !== undefined) {
                console.log('Resume Route');
                console.log(this.authHttp.resumeRoute);
                this.router.navigate([this.authHttp.resumeRoute]);
            } else {

                if (this.sessionManager.checkRoles(PERMISSION_ROLE.ROLE_GRADER)) {
                    this.router.navigate(['/faculty/index']);
                } else {
                    this.router.navigate(['/faculty/index']);
                }
            }

        }, error1 => {
            this.showSpinner = false;
            if (error1.status.toString().startsWith('4')) {
                this.notificationService.publishAlert('Username or Password incorrect');
            } else {
                this.notificationService.publishAlert('Failed to login. Please contact support');
            }
        });


    }

}
