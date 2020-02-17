import {Component, OnInit} from '@angular/core';
import {NavService} from '../../nav/nav.service';
import {Route, Router} from '@angular/router';

import {environment} from '../../../environments/environment';
import {SubmissionService} from '../submission/submission.service';
import {NotificationService} from '../../services/notification.service';
import {CourseService} from '../../faculty/course/course.service';
import {Submission} from '../../Model/submission';

@Component({
    selector: 'app-student-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class StudentIndexComponent implements OnInit {

    submissions$ = this.submissionService.allSubmissions;
    courses$ = this.courseService.serviceSubject;


    colCount = 2;

    limits = {
        course: 5,
        submission: 5
    };


    loading = {
        course: false,
        submission: false
    };

    constructor(private navService: NavService, private router: Router, private submissionService: SubmissionService, private courseService: CourseService, private notificationService: NotificationService) {
    }


    onResize(event) {
        this.recalculatCols(event.target.innerWidth);
    }

    recalculatCols(width) {
        this.colCount = (width <= 600) ? 1 : 2;
    }

    ngOnInit(): void {

            this.recalculatCols(window.innerWidth);




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

        (await this.submissionService.loadAllSubmissions()).subscribe(value => {
            this.loading.submission = false;
        });

        (await this.courseService.list()).subscribe(value => {
            this.loading.course = false;
        });

    }

    hasComments(submission: Submission) {
        let hasCommentUnseen = false;
        submission.responses.forEach(value => {
            if (value.status === 'COMMENTS_PENDING') {
                hasCommentUnseen = true;
            }
        });

        return hasCommentUnseen;
    }

}
