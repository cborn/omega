import {Component, OnInit} from '@angular/core';
import {AuthenticatedHttpClient} from '../../services/authenticated-http-service.service';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';
import {SiteService} from '../../services/site.service';
import {SessionManagerService} from '../../services/session-manager.service';

@Component({
    selector: 'app-super-admin-dashboard',
    templateUrl: './super-admin-dashboard.component.html',
    styleUrls: ['./super-admin-dashboard.component.css']
})
export class SuperAdminDashboardComponent implements OnInit {

    sites: any;
    users: any;

    constructor(private http: AuthenticatedHttpClient, private siteService: SiteService, private sessionController: SessionManagerService, private notificationService: NotificationService, private router: Router) {
    }

    ngOnInit() {
        this.loadSites();
        this.loadSuperUsers();
    }

    loadSites() {
        this.sessionController.displayTerm = null;
        this.sessionController.adminSite = null;
        this.notificationService.doesRequireReload();
        this.siteService.list();
        this.siteService.serviceObservable.subscribe(value => {
            this.sites = value;
        });
    }


    async loadSuperUsers() {
        const promise = await this.http.get(AuthenticatedHttpClient.USER_URL);
        promise.subscribe(data => {

            this.users = data.filter(user => user.role.indexOf('ROLE_SUPER_ADMIN') > -1);
        });
    }


    edit(site) {
        this.router.navigate(['superAdmin/site/edit', site.id]);
    }

    editUser(user) {
        this.router.navigate(['superAdmin/user/edit', user.id]);
    }

    select(site) {

        this.sessionController.adminSite = site;
        this.notificationService.didLoginObserver.emit(true);
        this.router.navigate(['faculty/index']);

    }


}
