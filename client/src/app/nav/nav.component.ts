import {Component} from '@angular/core';
import {NavService} from './nav.service';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Term} from '../Model/term';
import {User} from '../Model/user';
import {SessionManagerService} from '../services/session-manager.service';
import {NotificationService} from '../services/notification.service';
import {Site} from '../Model/site';

@Component({
    selector: 'app-navigation',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    applicationData: ApplicationData;

    currentTerm: any;


    constructor(private navService: NavService, private router: Router, private sessionService: SessionManagerService, private notificationService: NotificationService) {


    }

    didChangeTerm() {
        this.notificationService.doesRequireReload();
        this.sessionService.displayTerm = this.currentTerm;

    }


    ngOnInit(): void {
        this.loadData();
        this.notificationService.didLoginObserver.subscribe(() => {
            this.navService._navData = null;
            this.loadData();

        });
    }

    async loadData() {

        this.notificationService.reloadRequiredObserver.subscribe(() => {
            if (this.sessionService.adminSite == null) {
                this.applicationData = null;
            }
        });

        (await this.navService.getNavData()).subscribe(res => {
            this.applicationData = res;
            if (this.applicationData.term == null && this.applicationData.site == null && this.applicationData.isSuperAdmin) {
                this.router.navigate(['superAdmin/dashboard']);
            } else if (this.applicationData.term == null && this.applicationData.site != null && this.applicationData.isSuperAdmin) {
                this.router.navigate(['term/create']);
            } else {
                this.currentTerm = this.applicationData.term.id;
                this.sessionService.bucket = this.applicationData.bucket;
                this.sessionService.region = this.applicationData.region;

                this.didChangeTerm();
            }
        });
    }

    shouldShowSaveStatus() {
        return this.router.url.indexOf('lessonPage/builder') > -1;
    }

    logout() {
        this.sessionService.logout();
        this.applicationData = null;
        this.currentTerm = null;
        this.router.navigate(['/login']);

    }

}

class ApplicationData {
    term: Term;
    terms: Term[];
    site: Site;
    user: User;
    isSuperAdmin: boolean;
    isAdmin: boolean;
    isStudent: boolean;
    bucket: string;
    region: string;
}

