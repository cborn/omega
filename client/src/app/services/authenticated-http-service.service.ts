import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {throwError} from 'rxjs/internal/observable/throwError';
import {of} from 'rxjs/internal/observable/of';
import {catchError} from 'rxjs/operators';
import {SessionManagerService} from './session-manager.service';
import {Router} from '@angular/router';
import {NotificationService} from './notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LoginResponse} from '../login/login.component';

export interface IRequestOptions {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    body?: any;
}

export function AuthenticatedHttpClientFactory(http: HttpClient, sessionManager: SessionManagerService, router: Router, notificationService: NotificationService) {
    return new AuthenticatedHttpClient(http, sessionManager, router, notificationService);
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticatedHttpClient {


    // ERRORS
    static ACTIVATION_REQUIRED_ERROR = 'ER1001';


    static AUTH_URL = environment.BASE_URL + 'api/login';
    static LTI_OTP_LOGIN_URL = environment.BASE_URL + 'lti/authenticate';
    static REFRESH_AUTH_URL = environment.BASE_URL + 'oauth/access_token';

    static APPLICATION_URL = environment.BASE_URL + 'application';

    static LESSON_PAGE_URL = environment.BASE_URL + 'lessonPage';
    static LESSON_PAGE_MOVE_UP_URL = environment.BASE_URL + 'lessonPage/moveUp';
    static LESSON_PAGE_MOVE_DOWN_URL = environment.BASE_URL + 'lessonPage/moveDown';


    static QUESTION_IMAGE_ADD_URL = environment.BASE_URL + 'question/addImage';
    static QUESTION_IMAGE_REMOVE_URL = environment.BASE_URL + 'question/removeImage';
    static QUESTION_URL = environment.BASE_URL + 'question';
    static COURSE_URL = environment.BASE_URL + 'course';
    static LESSON_URL = environment.BASE_URL + 'lesson';
    static TERM_URL = environment.BASE_URL + 'term';
    static SUBMISSION_URL = environment.BASE_URL + 'submission';

    static RECORDING_ADD_URL = environment.BASE_URL + 'submission/addRecording';





    helper = new JwtHelperService();

    public resumeRoute;


    private headers: HttpHeaders;


    // Extending the HttpClient through the Angular DI.
    public constructor(public http: HttpClient, private sessionManager: SessionManagerService, private router: Router, private notificationService: NotificationService) {
    }


    // /**
    //  * Refresh JWT authorization session token
    //  */
    async refreshSessionToken() {

        const token = this.sessionManager.getSessionToken();

        if (this.helper.isTokenExpired(token)) {
            const formData = new FormData();
            formData.append('grant_type', 'refresh_token');
            formData.append('refresh_token', this.sessionManager.getRefreshToken());
            await this.http.post<LoginResponse>(AuthenticatedHttpClient.REFRESH_AUTH_URL, formData).subscribe(async value => {
                this.sessionManager.setSessionToken(value.access_token);
                this.sessionManager.setExpires(value.expires_in);
                this.sessionManager.setRefreshToken(value.refresh_token);
                this.sessionManager.setRoles(value.roles);
                this.sessionManager.setUsername(value.username);
                this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + value.access_token);
            });
        } else {
            this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        }


    }


    public errorHandler = (error: any, mute?: boolean) => {

        const errorMsg = error.error;
        if (error.status === 401) {
            if (this.router.url !== '/login') {
                this.resumeRoute = this.router.url;
            }

            this.router.navigate(['/login']);
        } else if (error.status === 0) {
            this.notificationService.publishAlert('We\'re having difficulty connecting to the server. Please check your internet connection or try again in a few minutes.');
        } else {
            if (!mute && errorMsg !== undefined) {
                if (errorMsg.total != null) {
                    this.notificationService.publishAlert(errorMsg._embedded.errors[0].message); // Multiple errors so display the first one..
                } else {
                    this.notificationService.publishAlert(errorMsg.message);
                }
            }
            return new Error(JSON.stringify(errorMsg));
        }
    };


    /**
     * GET request
     * @param {string} endPoint it doesn't need / in front of the end point
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @param {boolean} disableErrorHandling silently catch errors
     * @param {boolean} mute to stop errors from being printed to the screen.
     * @returns {Observable<T>}
     */
    public async get<T>(endPoint: string, options?: IRequestOptions, disableErrorHandling?: boolean, mute?: boolean) {

        await this.refreshSessionToken();

        return this.http.get<T>(endPoint, Object.assign({}, options, {headers: this.headers}))
            .pipe(catchError(err => disableErrorHandling ? throwError(err) : throwError(this.errorHandler(err, mute))));
    }

    /**
     * POST request
     * @param {string} endPoint end point of the api
     * @param {Object} params body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @param {boolean} mute to stop errors from being printed to the screen.
     * @returns {Observable<T>}
     */
    public async post<T>(endPoint: string, params: Object, options?: IRequestOptions, mute?: boolean) {
        await this.refreshSessionToken();
        return this.http.post<T>(endPoint, params, Object.assign({}, options, {headers: this.headers}))
            .pipe(catchError(err => throwError(this.errorHandler(err, mute))));
    }

    /**
     * PUT request
     * @param {string} endPoint end point of the api
     * @param {Object} params body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @param {boolean} mute to stop errors from being printed to the screen.
     * @returns {Observable<T>}
     */
    public async put<T>(endPoint: string, params: Object, options?: IRequestOptions, mute?: boolean) {
        await this.refreshSessionToken();
        return this.http.put<T>(endPoint, params, Object.assign({}, options, {headers: this.headers}))
            .pipe(catchError(err => throwError(this.errorHandler(err, mute))));
    }

    /**
     * DELETE request
     * @param {string} endPoint end point of the api
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @param {boolean} mute to stop errors from being printed to the screen.
     * @returns {Observable<T>}
     */
    public async delete<T>(endPoint: string, options?: IRequestOptions, mute?: boolean) {
        await this.refreshSessionToken();
        return this.http.delete<T>(endPoint, Object.assign({}, options, {headers: this.headers}))
            .pipe(catchError(err => throwError(this.errorHandler(err, mute))));
    }

}
