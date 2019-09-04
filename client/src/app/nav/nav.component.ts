import {Component} from '@angular/core';
import {NavService} from './nav.service';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Term} from '../Model/term';
import {User} from '../Model/user';
import {SessionManagerService} from '../services/session-manager.service';
import {NotificationService} from '../services/notification.service';

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
    }

    async loadData() {
        (await this.navService.getNavData()).subscribe(res => {
            this.applicationData = res;
            this.currentTerm = this.applicationData.term.id;
        });
    }

    shouldShowSaveStatus() {
        return this.router.url.indexOf('lessonPage/builder') > -1;
    }
}

class ApplicationData {
    term: Term;
    terms: Term[];
    user: User;
    isAdmin: boolean;
}

