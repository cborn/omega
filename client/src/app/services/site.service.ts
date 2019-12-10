import {Injectable} from '@angular/core';
import {BaseService} from '../Blueprints/base-service';
import {User} from '../Model/user';
import {AuthenticatedHttpClient} from './authenticated-http-service.service';
import {Site} from '../Model/site';

@Injectable({
    providedIn: 'root'
})
export class SiteService extends BaseService<Site> {

    constructor(private h: AuthenticatedHttpClient) {
        super(h, AuthenticatedHttpClient.SITE_URL);
    }

    getClassName() {
        return 'Site';
    }
}
