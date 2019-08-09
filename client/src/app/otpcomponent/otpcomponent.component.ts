import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedHttpClient} from '../services/authenticated-http-service.service';
import {LoginResponse} from '../login/login.component';
import {SessionManagerService} from '../services/session-manager.service';

@Component({
    selector: 'app-otpcomponent',
    templateUrl: './otpcomponent.component.html',
    styleUrls: ['./otpcomponent.component.css']
})
export class OTPComponentComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router, private http: AuthenticatedHttpClient, private sessionManager:SessionManagerService) {
    }

    loading = true;

    ngOnInit() {


        this.route.queryParamMap.subscribe(async value => {
            const key = value.get('key');
            const resumeRoute = value.get('resumeRoute');

            const promise = await this.http.get<LoginResponse>(AuthenticatedHttpClient.LTI_OTP_LOGIN_URL + "?key=" + key);

            promise.subscribe(auth => {
                this.sessionManager.setSessionToken(auth.access_token);
                this.sessionManager.setExpires(auth.expires_in);
                this.sessionManager.setRefreshToken(auth.refresh_token);
                this.sessionManager.setRoles(auth.roles);
                this.sessionManager.setUsername(auth.username);
                if (resumeRoute !== undefined) {
                    this.router.navigate([resumeRoute]);
                } else {
                    this.router.navigate(['/course/index']);
                }
            }, error1 => {
                console.log(error1);
                this.loading = false;
            })


            if (key == null) {
                this.router.navigate(['index']);
            } else {
                // Get the auth code and store it and move on.

            }

        });


    }

}
