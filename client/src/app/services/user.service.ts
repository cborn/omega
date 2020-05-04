import {Injectable} from '@angular/core';
import {BaseService} from '../Blueprints/base-service';
import {User} from '../Model/user';
import {AuthenticatedHttpClient} from './authenticated-http-service.service';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService<User> {

    constructor(private h: AuthenticatedHttpClient) {
        super(h, AuthenticatedHttpClient.USER_URL);
    }


    async saveAsSuperAdmin(updatePackage, handler?) {
        const promise = await this.h.post<User>(this.URL + '/saveAsSuperAdmin', updatePackage);

        promise.subscribe(value => {
             if (handler) {
                handler(value);
            }

        });

    }


    getClassName() {
        return 'User';
    }
}
