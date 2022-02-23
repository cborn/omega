import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {LessonPageService} from '../lessonPage/lesson-page.service';
import {ActivatedRoute} from '@angular/router';
import {SubmissionService} from '../../student/submission/submission.service';
import {SubmissionResponse} from '../../Model/submissionResponse';
import {User} from '../../Model/user';
import {AuthenticatedHttpClient} from '../../services/authenticated-http-service.service';
import {NotificationService} from '../../services/notification.service';
import {any} from "codelyzer/util/function";

@Component({
    selector: 'app-gradebook',
    templateUrl: './gradebook.component.html',
    styleUrls: ['./gradebook.component.css']
})
export class GradebookComponent implements OnInit {

    users$ = this.userService.serviceObservable;
    submissions$ = this.submissionService.allSubmissions;
    pages$ = this.lessonPageService.serviceObservable;

    lessonId;

    grades = {};


    constructor(private userService: UserService, private submissionService: SubmissionService, private notificationService: NotificationService, private lessonPageService: LessonPageService, private rt: ActivatedRoute, private http: AuthenticatedHttpClient) {
    }

    ngOnInit() {
        this.rt.paramMap.subscribe(value => {
            if (value.get('lessonId') != null) {
                this.lessonId = value.get('lessonId');
            }
            this.loadData();
        });


        this.notificationService.reloadRequiredObserver.subscribe(() => {
            this.loadData();
        });

    }

    loadData() {

        this.userService.getEnrolled(this.lessonId);
        //this.userService.list('true', 'student');
        this.submissionService.loadAllSubmissions(this.lessonId);
        this.lessonPageService.list(this.lessonId, 'lessonId');
        console.log(this.users$, 'loadData')
        this.loadGrades();
    }


    async loadGrades() {
        const promise = await this.http.get(AuthenticatedHttpClient.ENROLLMENT_GRADES_URL + this.lessonId, {}, false, true, true);

        promise.subscribe(value => {
            if(value.hasOwnProperty("ignore"))
                return;
            for (const i in value) {
                this.grades[value[i].user.id] = value[i].grade;
            }
        });

        return promise;

    }

    getResponseForPageAndQuestion(page, user, question) {

        for (const submission of this.submissionService.allSubmissionsSubject.value) {
            if (submission.page.id === page.id && submission.user.id === user.id) {
                for (const subResponse of submission.responses) {
                    if (subResponse.question.id === question.id) {
                        return subResponse;
                    }
                }
            }
        }

        return null;

    }

    getSubmissionIdForPageAndUser(page, user) {
        for (const submission of this.submissionService.allSubmissionsSubject.value) {
            if (submission.page.id === page.id && submission.user.id === user.id) {

                return submission.id;

            }
        }

        return null;
    }


    getMaxPossibleGrade(user: User) {

        let maxGrade = 0;


        for (const lessonPage of this.lessonPageService.serviceSubject.value) {
            for (const question of lessonPage.questions) {
                maxGrade += question.max_grade;
            }
        }

        return maxGrade;

    }

    getPrettyStatusName(status) {
        switch (status) {
            case 'AWAITING_REVIEW' :
                return 'Awaiting Review';
            case 'SEEN' :
                return 'Seen';
            case 'COMMENTS_PENDING' :
                return 'Comments pending review';
            case 'COMMENTS_RESPONDED' :
                return 'Comments have been responded to';
            case 'GRADED' :
                return 'Graded';


        }
    }

    getIconForStatus(status) {
        switch (status) {
            case 'AWAITING_REVIEW' :
                return 'queue';
            case 'SEEN' :
                return 'remove_red_eye';
            case 'COMMENTS_PENDING' :
                return 'comment';
            case 'COMMENTS_RESPONDED' :
                return 'reply';
            case 'GRADED' :
                return 'grade';


        }
    }

    async submitGradeForUserForLesson(user: User) {

        const data = {
            user: user.id,
            lesson: this.lessonId,
            grade: this.grades[user.id]
        };

        // create or update the enrollment for the user and submission and term.
        const promise = await this.http.post(AuthenticatedHttpClient.ENROLLMENT_URL, data, {}, false, true);

        promise.subscribe(value => {
            this.userService.list('true', 'student');
            this.notificationService.publishAlert('Updated grades');
        });

        return promise;


    }
}
