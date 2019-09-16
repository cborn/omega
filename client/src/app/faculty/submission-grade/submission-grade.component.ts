import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubmissionService} from '../../student/submission/submission.service';
import {SubmissionResponse} from '../../Model/submissionResponse';
import {Submission} from '../../Model/submission';
import {NotificationService} from '../../services/notification.service';

@Component({
    selector: 'app-submission-grade',
    templateUrl: './submission-grade.component.html',
    styleUrls: ['./submission-grade.component.css']
})
export class SubmissionGradeComponent implements OnInit {

    submission$ = this.submissionService.submission;
    page$ = this.submissionService.page;


    originalGrade = 0;


    constructor(private route: ActivatedRoute, private router: Router, private submissionService: SubmissionService, private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(async value => {
            if (value.get('submissionId')) {
                (await this.submissionService.loadData(value.get('submissionId')));
                this.submissionService.markSubmissionAsSeen(value.get('submissionId'));
            } else {
                this.router.navigate(['faculty/index']);
            }
        });

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

    submit(submission: Submission) {

        this.submissionService.grade(submission, () => {

            this.notificationService.publishAlert('Assignment has been given the grade: ' + submission.grade, () => {
                this.router.navigate(['/faculty/index']);
            });

        });


    }

    updateGrade(submission: Submission) {

        submission.grade = 0;
        for (const response of submission.responses) {
            submission.grade += response.grade == null ? 0 : response.grade;
        }


    }

    getMaxGrade() {
        let grade = 0;
        for (const question of this.submissionService.pageSubject.value.questions) {
            grade += question.max_grade;
        }

        return grade;
    }


}
