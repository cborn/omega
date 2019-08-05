import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {throwError} from 'rxjs/internal/observable/throwError';
import {of} from 'rxjs/internal/observable/of';
import {catchError} from 'rxjs/operators';
import {SessionManagerService} from './session-manager.service';
import {Router} from '@angular/router';

export interface IRequestOptions {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    body?: any;
}

export function AuthenticatedHttpClientFactory(http: HttpClient, sessionManager: SessionManagerService, router: Router) {
    return new AuthenticatedHttpClient(http, sessionManager, router);
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticatedHttpClient {


    // ERRORS
    static ACTIVATION_REQUIRED_ERROR = 'ER1001';


    static AUTH_URL = environment.BASE_URL + 'api/login';
    static APPLICATION_URL = environment.BASE_URL + 'application';
    static REGISTER_URL = environment.BASE_URL + '/v1/accounts/register';
    static REGISTER_WITH_VOUCHER_URL = environment.BASE_URL + '/v1/accounts/subscribeWithVoucher';
    static IMAGE_URL = environment.BASE_URL + '/v1/image';
    static UPDATE_ACCOUNT_URL = environment.BASE_URL + '/v1/accounts/update';
    static UPDATE_ACCOUNT_WITH_ID_URL = environment.BASE_URL + '/v1/accounts/update/{id}';
    static RESEND_URL = environment.BASE_URL + '/v1/accounts/resend';
    static RESEND_VOUCHER_URL = environment.BASE_URL + '/v1/accounts/resendWithVoucher';
    static UPLOAD_URL = environment.BASE_URL + '/v1/document/upload';
    static GET_DOCUMENT_URL = environment.BASE_URL + '/v1/document'; // ----- ...ent/{id}/?{version}
    static BATCH_GET_URL = environment.BASE_URL + '/v1/Batch/get';
    static BATCH_ADD_URL = environment.BASE_URL + '/v1/Batch/add';
    static BATCH_DELETE_URL = environment.BASE_URL + '/v1/Batch/delete';
    static BATCH_MOVE_URL = environment.BASE_URL + '/v1/Batch/move';
    static BATCH_PDF_URL = environment.BASE_URL + '/v1/Batch/makePdf';
    static TASK_URL = environment.BASE_URL + '/v1/tasks'; // ----- ...sks/{id}
    static GET_TASKS_URL = environment.BASE_URL + '/v1/tasks/all?tz=' + new Date().getTimezoneOffset(); // ----- ...sks/{id}
    static DIRECTORY_URL = environment.BASE_URL + '/v1/document/structure?dir='; // ----- ...sks/{id}
    static DIRECTORY_COUNT_URL = environment.BASE_URL + '/v1/document/folderCount'; // ----- ...sks/{id}
    static ROOT_DIRECTORY_COUNT_URL = environment.BASE_URL + '/v1/document/folderCount'; // ----- ...sks/{id}
    static DIRECTORY_UPDATE_URL = environment.BASE_URL + '/v1/document/'; // ----- ...sks/{id}
    static TASK_URL_WITH_DOC = environment.BASE_URL + '/v1/tasks/withDoc'; // ----- ...sks/{id}
    static FORGOT_PASSWORD_URL = environment.BASE_URL + '/v1/accounts/forgot';
    static RESET_PASSWORD_URL = environment.BASE_URL + '/v1/accounts/setPassword';
    static NOTIFICATION_COUNT_URL = environment.BASE_URL + '/v1/notifications/unread';
    static NOTIFICATION_LIST_URL = environment.BASE_URL + '/v1/notifications/all';
    static TASK_SEARCH_URL = environment.BASE_URL + '/v1/tasks/search';
    static TASK_LOCK_URL = environment.BASE_URL + '/v1/tasks/lock';
    static DOCUMENT_SEARCH_URL = environment.BASE_URL + '/v1/document/search';
    static DOCUMENT_VIEW_URL = environment.BASE_URL + '/v1/document/view';
    static GET_FAMILY_URL = environment.BASE_URL + '/v1/accounts/family';
    static INVITE_USER_URL = environment.BASE_URL + '/v1/accounts/invite';
    static JOIN_FAMILY_URL = environment.BASE_URL + '/v1/accounts/join';
    static HAS_ACCOUNT_URL = environment.BASE_URL + '/v1/accounts/exists';
    static UPDATE_TASK_URL = environment.BASE_URL + '/v1/tasks/';
    static ADD_COMMENT_URL = environment.BASE_URL + '/v1/tasks/{id}/comment';
    static DOCUMENT_DELETE_URL = environment.BASE_URL + '/v1/document/';
    static RECENTLY_DELETED_URL = environment.BASE_URL + '/v1/document/deleted';
    static RESTORE_DOC_URL = environment.BASE_URL + '/v1/document/{id}/restore';
    static PROFILE_STATUS_URL = environment.BASE_URL + '/v1/accounts/profile-status';
    static ADD_FOLDER_URL = environment.BASE_URL + '/v1/document/folder';
    static RENAME_DOCUMENT_URL = environment.BASE_URL + '/v1/document/rename';
    static GET_DOCUMENT_PREVIEW_URL = environment.BASE_URL + '/v1/document/preview';
    static CHANGE_PASSWORD_URL = environment.BASE_URL + '/v1/accounts/setPasswordAuthorised';
    static GET_ALL_ENTITIES_URL = environment.BASE_URL + '/v1/entity/list';


    static RESEND_FAMILY_INVITE_URL = environment.BASE_URL + '/v1/accounts/family/resend?email=';


    static ENTITY_UPDATE_URL = environment.BASE_URL + '/v1/entity/upsert';
    static REMOVE_ENTITY_URL = environment.BASE_URL + '/v1/entity/{id}';
    static COMPLETE_PROFILE_URL = environment.BASE_URL + '/v1/accounts/complete';


    static SUBSCRIBE_IOS_URL = environment.BASE_URL + '/v1/accounts/subscribe/ios';
    static SUBSCRIBE_ANDROID_URL = environment.BASE_URL + '/v1/accounts/subscribe/android';

    static SUBSCRIPTION_URL = environment.BASE_URL + '/v1/accounts/subscription';
    static SUBSCRIPTION_RENEW_URL = environment.BASE_URL + '/v1/accounts/subscription/renew';
    static SUBSCRIPTION_INVOICES_URL = environment.BASE_URL + '/v1/accounts/subscription/invoices';
    static PAYMENT_DETAILS_URL = environment.BASE_URL + '/v1/accounts/subscription/cards';
    static ADD_CARD_URL = environment.BASE_URL + '/v1/accounts/subscription/card';
    static REMOVE_CARD_URL = environment.BASE_URL + '/v1/accounts/subscription/card?id=';
    static MAKE_CARD_DEFAULT_URL = environment.BASE_URL + '/v1/accounts/subscription/card/default?id=';
    static COUPON_CHECK_URL = environment.BASE_URL + '/v1/accounts/coupon/check?coupon=';
    static COUPON_APPLY_URL = environment.BASE_URL + '/v1/accounts/coupon/apply?coupon=';


    // 2FA
    static MFA_STATUS_URL = environment.BASE_URL + '/v1/accounts/2FA/status';
    static MFA_ENABLE_URL = environment.BASE_URL + '/v1/accounts/2FA/enable';
    static MFA_VERIFICATION_URL = environment.BASE_URL + '/v1/accounts/2FA/verify';
    static MFA_RESEND_URL = environment.BASE_URL + '/v1/accounts/2FA/resend';
    static MFA_RESEND_VERIFICATION_URL = environment.BASE_URL + '/v1/accounts/2FA/resendVerification';
    static MFA_CONFIRM_URL = environment.BASE_URL + '/v1/accounts/2FA/confirm';
    static MFA_DISABLE_URL = environment.BASE_URL + '/v1/accounts/2FA/disable';


    static FAQ_URL = environment.BASE_URL + '/v1/FAQ/all';


    // Account Settings
    static ACCOUNT_SETTINGS_URL = environment.BASE_URL + '/v1/accounts/settings/'; // Append activity type onto the end of the url


    private headers: HttpHeaders;


    // Extending the HttpClient through the Angular DI.
    public constructor(public http: HttpClient, private sessionManager: SessionManagerService, private router: Router) {
    }


    // /**
    //  * Refresh JWT authorization session token
    //  */
    async refreshSessionToken() {

        const token = await this.sessionManager.getSessionToken();
        this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    }


    public errorHandler = (error: any, mute?: boolean) => {
        const errorMsg = error.error;
        if (error.status === 401) {
            this.router.navigate(['/login']);
        } else {
            if (!mute && errorMsg !== undefined) {
                // this.notificationService.pushAlert('Error', errorMsg.message);
            }
            return throwError(
                new Error(JSON.stringify(errorMsg))
            );
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
    public get<T>(endPoint: string, options?: IRequestOptions, disableErrorHandling?: boolean, mute?: boolean) {

        this.refreshSessionToken();

        return this.http.get<T>(endPoint, Object.assign({}, options, {headers: this.headers}))
            .pipe(catchError(err => disableErrorHandling ? of(err) : this.errorHandler(err, mute)));
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
            .pipe(catchError(err => this.errorHandler(err, mute)));
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
            .pipe(catchError(err => this.errorHandler(err, mute)));
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
            .pipe(catchError(err => this.errorHandler(err, mute)));
    }

}
