import {Component, OnInit} from '@angular/core';
import {Course} from '../../Model/course';
import {CourseService} from '../../faculty/course/course.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {SessionManagerService} from '../../services/session-manager.service';
import {SiteService} from '../../services/site.service';
import {Site} from '../../Model/site';
import {User} from '../../Model/user';
import {UserService} from '../../services/user.service';
import {AlertService} from '../../services/alert.service';

@Component({
    selector: 'app-super-admin-user-create',
    templateUrl: './super-admin-alert-create.component.html',
    styleUrls: ['./super-admin-alert-create.component.css']
})
export class SuperAdminAlertCreateComponent implements OnInit {

    alert: {
        alert_start?: Date;
        alert_end?: Date;

    } = {};

    alert_start;
    alert_end;

    constructor(private alertService: AlertService, private router: Router, private sessionManager: SessionManagerService) {
    }

    ngOnInit() {


    }

    create() {

        // "2020-05-18T20:20" "2020-04-18T20:25"

        this.alert.alert_start = new Date(this.alert_start);
        this.alert.alert_end = new Date(this.alert_end);


        this.alertService.insert(this.alert, (data) => {
            this.router.navigate(['/superAdmin/dashboard']);
        });
    }
}
