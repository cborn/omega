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


    limits = {
        user: 5,
        course: 5,
        submission: 5
    };


    loading = {
        user: false,
        course: false,
        submission: false
    };


    ngOnInit(): void {


        this.notificationService.reloadRequiredObserver.subscribe(value => {
            if (value) {
                this.loadData();
            }
        });

        this.loadData();
    }

    async loadData() {

        this.loading.submission = true;
        this.loading.course = true;
        this.loading.user = true;

        (await this.submissionService.loadAllSubmissions()).subscribe(value => {
            this.loading.submission = false;
        });

        (await this.courseService.list()).subscribe(value => {
            console.log('Courses Loaded');
            this.loading.course = false;
        });

        (await this.userService.list()).subscribe(value => {
            console.log('Users Loaded');
            this.loading.user = false;
        });
    }




}
