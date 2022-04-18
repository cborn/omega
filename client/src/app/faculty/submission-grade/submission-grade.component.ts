import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubmissionService} from '../../student/submission/submission.service';
import {SubmissionResponse} from '../../Model/submissionResponse';
import {Submission} from '../../Model/submission';
import {NotificationService} from '../../services/notification.service';
import {UserService} from '../../services/user.service';


enum ViewMode {
    SINGLE,
    FULL
}

@Component({
    selector: 'app-submission-grade',
    templateUrl: './submission-grade.component.html',
    styleUrls: ['./submission-grade.component.css']
})
export class SubmissionGradeComponent implements OnInit {

    ViewMode = ViewMode;

    submission: Submission;
    page$ = this.submissionService.page;

    visibleQuestion = 0;

    viewMode = ViewMode.FULL;


    originalGrade = 0;

    nextSubmission;
    previousSubmission;


    constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private submissionService: SubmissionService, private notificationService: NotificationService) {
    }


    ngOnInit() {

        this.userService.list('true', 'student');
        this.route.queryParams.subscribe(params => {
            if (params.questionIndex != undefined) {
                this.viewMode = ViewMode.SINGLE;
                this.visibleQuestion = parseInt(params.questionIndex,10);
            }
        });

        this.route.paramMap.subscribe(async value => {
            if (value.get('submissionId')) {
                (await this.submissionService.loadData(value.get('submissionId')));
                if (this.viewMode == ViewMode.FULL) {
                    this.submissionService.markSubmissionAsSeen(value.get('submissionId'));
                }
            } else {
                this.router.navigate(['faculty/index']);
            }
        });


        this.submissionService.submission.subscribe(submission => {
            console.log(submission, 'submission changed');
            if (submission.id != undefined) {
                this.submissionService.loadAllSubmissions(submission.lesson.id);
            }
            this.submission = submission;
        });

        this.submissionService.allSubmissions.subscribe(next => {
            this.calculateNextAndPreviousSubmission();
        });


    }

    nextQuestion() {
        this.visibleQuestion++;
    }

    previousQuestion() {
        this.visibleQuestion--;
    }

    async nextStudent() {

        if (this.nextSubmission != null) {
            (await this.submissionService.loadData(this.nextSubmission.id));
            this.submissionService.markSubmissionAsSeen(this.nextSubmission.id);

        }
    }

    async previousStudent() {
        if (this.previousSubmission != null) {
            (await this.submissionService.loadData(this.previousSubmission.id));
            this.submissionService.markSubmissionAsSeen(this.previousSubmission.id);

        }
    }


    calculateNextAndPreviousSubmission() {

        this.nextSubmission = null;
        this.previousSubmission = null;
        var users = this.userService.serviceSubject.value;
        var thisUser = -1;
        for (const i in users) {
            if (users[i].id === this.submissionService.submissionSubject.value.user.id) {
                thisUser = parseInt(i,10);
            }
        }


        if (thisUser > -1 && thisUser < users.length) {
            const submissions = this.submissionService.allSubmissionsSubject.value;
            for (const j in submissions) {

                if (thisUser > 0) {
                    if (submissions[j].user.id == users[thisUser - 1].id) {
                        this.previousSubmission = submissions[j];
                    }
                }

                if (thisUser < users.length - 1) {
                    if (submissions[j].user.id == users[thisUser + 1].id) {
                        this.nextSubmission = submissions[j];
                    }
                }
            }
        }
    }


    getQuestion(id) {
        for (const i in this.submissionService.pageSubject.value.questions) {
            if (this.submissionService.pageSubject.value.questions[i].id === id) {
                return this.submissionService.pageSubject.value.questions[i];
            }
        }
    }

    getQuestionType(id) {
        for (const i in this.submissionService.pageSubject.value.questions) {
            if (this.submissionService.pageSubject.value.questions[i].id === id) {
                return this.submissionService.pageSubject.value.questions[i].type;
            }
        }

    }

    getQuestionName(id) {
        for (const i in this.submissionService.pageSubject.value.questions) {
            if (this.submissionService.pageSubject.value.questions[i].id === id) {
                return this.submissionService.pageSubject.value.questions[i].name;
            }
        }
    }


    questionUpdated(event) {
        this.submissionService.softUpdate(event);


    }

    submit(submission: Submission) {

        this.submissionService.grade(submission, () => {

            this.notificationService.publishAlert('Assignment has been given the grade: ' + submission.grade, () => {
                this.router.navigate(['/faculty/index']);
            });

        });


    }

    updateGrade(submission: Submission) {

        if (!submission.page.rubricGrading) {
            let grade = 0;
            for (const response of submission.responses) {
                grade += response.grade == null ? 0 : parseInt(response.grade, 10);
            }

            submission.grade = grade + '';
        }

    }

    getMaxGrade() {
        let grade = 0;
        if (this.submissionService.pageSubject.value.questions !== undefined) {
            for (const question of this.submissionService.pageSubject.value.questions) {
                grade += question.max_grade;
            }
        }

        return grade;
    }

    toggleViewMode() {
        if (this.viewMode == ViewMode.FULL) {
            this.viewMode = ViewMode.SINGLE;
        } else {
            this.viewMode = ViewMode.FULL;
        }
    }


}
