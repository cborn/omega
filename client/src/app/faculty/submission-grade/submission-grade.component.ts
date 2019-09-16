import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubmissionService} from '../../student/submission/submission.service';
import {SubmissionResponse} from '../../Model/submissionResponse';
import {Submission} from '../../Model/submission';

@Component({
    selector: 'app-submission-grade',
    templateUrl: './submission-grade.component.html',
    styleUrls: ['./submission-grade.component.css']
})
export class SubmissionGradeComponent implements OnInit {

    submission$ = this.submissionService.submission;
    page$ = this.submissionService.page;


    constructor(private route: ActivatedRoute, private router: Router, private submissionService: SubmissionService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(value => {
            if (value.get('submissionId')) {
                this.submissionService.loadData(value.get('submissionId'));
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

        let grade = 0;
        for (const response of submission.responses) {
            grade += response.grade;
        }

        this.submissionService.grade(submission, () => {
            console.log('Graded the assignment');
        });


    }

    updateGrade(response, event) {
        console.log(event);


    }


}
