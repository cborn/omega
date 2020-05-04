import {Injectable} from '@angular/core';
import {BaseService} from '../Blueprints/base-service';
import {User} from '../Model/user';
import {AuthenticatedHttpClient} from './authenticated-http-service.service';
import {Alert} from '../Model/alert';

@Injectable({
    providedIn: 'root'
})
export class AlertService extends BaseService<Alert> {

    constructor(private h: AuthenticatedHttpClient) {
        super(h, AuthenticatedHttpClient.ALERTS_URL);
    }





    getClassName() {
        return 'SystemAlert';
    }
}
