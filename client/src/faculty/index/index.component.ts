import {Component, OnInit} from '@angular/core';
import {NavService} from '../../app/nav/nav.service';
import {Route, Router} from '@angular/router';
import {SubmissionService} from '../../app/student/submission/submission.service';
import {CourseService} from '../course/course.service';
import {NotificationService} from '../../app/services/notification.service';
import {UserService} from '../../app/services/user.service';

@Component({
    selector: 'app-faculty-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class FacultyIndexComponent implements OnInit {

    constructor(private navService: NavService, private router: Router, private submissionService: SubmissionService, private courseService: CourseService, private notificationService: NotificationService, private userService: UserService) {
    }


    submissions$ = this.submissionService.allSubmissions;
    courses$ = this.courseService.serviceSubject;
    users$ = this.userService.serviceSubject;


    ngOnInit(): void {


        this.notificationService.reloadRequiredObserver.subscribe(value => {
            if (value) {
                this.loadData();
            }
        });

        this.loadData();
    }

    async loadData() {

        await this.submissionService.loadAllSubmissions();
        await this.courseService.list();
        await this.userService.list();
    }

}
