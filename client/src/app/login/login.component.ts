import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {SessionManagerService} from '../session-manager.service';
import {NotificationService} from '../notification.service';
import {AuthenticatedHttpClient} from '../authenticated-http-service.service';
import {JwtHelperService} from '@auth0/angular-jwt';

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

    constructor(private router: Router, private http: HttpClient, private sessionManager: SessionManagerService, private notificationService: NotificationService) {
    }


    username: string;
    password: string;

    ngOnInit() {
    }

    login(): void {

        const loginPackage = {
            username: this.username,
            password: this.password
        };


        this.http.post<LoginResponse>(AuthenticatedHttpClient.AUTH_URL, loginPackage).subscribe(value => {

            this.sessionManager.setSessionToken(value.access_token);



            this.sessionManager.setExpires(value.expires_in);
            this.sessionManager.setRefreshToken(value.refresh_token);
            this.sessionManager.setRoles(value.roles);
            this.sessionManager.setUsername(value.username);

            this.router.navigate(['/lesson/builder/3']);

        }, error1 => {
            if (error1.status.toString().startsWith('4')) {
                this.notificationService.publishAlert('Username or Password incorrect');
            } else {
                this.notificationService.publishAlert('Failed to login. Please contact support');
            }
        });


    }

}
