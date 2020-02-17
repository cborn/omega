import {Component, OnInit} from '@angular/core';
import {NavService} from '../../nav/nav.service';
import {Router} from '@angular/router';
import {SubmissionService} from '../../student/submission/submission.service';
import {CourseService} from '../course/course.service';
import {NotificationService} from '../../services/notification.service';
import {UserService} from '../../services/user.service';
import {PERMISSION_ROLE, SessionManagerService} from '../../services/session-manager.service';

@Component({
    selector: 'app-faculty-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class FacultyIndexComponent implements OnInit {

    constructor(private navService: NavService, private sessionManagerService: SessionManagerService, private router: Router, private submissionService: SubmissionService, private courseService: CourseService, private notificationService: NotificationService, private userService: UserService) {
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

        if(this.loading.submission && this.loading.course && this.loading.user)
            return;


        this.loading.submission = true;
        this.loading.course = true;
        this.loading.user = true;

        (await this.submissionService.loadAllSubmissions()).subscribe(value => {
            this.loading.submission = false;
        });

        (await this.courseService.list()).subscribe(value => {
            this.loading.course = false;
        });


        if(this.isFaculty()) {
            (await this.userService.list()).subscribe(value => {
                this.loading.user = false;
            });
        }
    }

    isFaculty() {
        return this.sessionManagerService.checkRoles(PERMISSION_ROLE.ROLE_FACULTY);
    }




}
