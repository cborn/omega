import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {LessonPageService} from '../lessonPage/lesson-page.service';
import {ActivatedRoute} from '@angular/router';
import {SubmissionService} from '../../student/submission/submission.service';
import {SubmissionResponse} from '../../Model/submissionResponse';
import {User} from '../../Model/user';
import {AuthenticatedHttpClient} from '../../services/authenticated-http-service.service';

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

    grades = {

    }


    constructor(private userService: UserService, private submissionService: SubmissionService, private lessonPageService: LessonPageService, private rt: ActivatedRoute, private http: AuthenticatedHttpClient) {
    }

    ngOnInit() {
        this.rt.paramMap.subscribe(value => {
            if (value.get('lessonId') != null) {
                this.lessonId = value.get('lessonId');
            }
            this.loadData();
        });
    }

    loadData() {
        this.userService.list('true', 'student');
        this.submissionService.loadAllSubmissions(this.lessonId);
        this.lessonPageService.list(this.lessonId, 'lessonId');
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

        for (const submission of this.submissionService.allSubmissionsSubject.value) {
            if (submission.user.id === user.id) {
                for (const subResponse of submission.responses) {

                    maxGrade += subResponse.question.max_grade;

                }
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
        });

        return promise;


    }


}
