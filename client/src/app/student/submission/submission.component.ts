import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubmissionService} from './submission.service';
import {AnswerChangedEvent} from '../../Events/answer-changed-event';
import {Submission} from '../../Model/submission';
import {LessonPage} from '../../Model/lesson-page';

@Component({
    selector: 'app-submission',
    templateUrl: './submission.component.html',
    styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {

    submission$ = this.submissionService.submission;
    page$ = this.submissionService.page;


    constructor(private route: ActivatedRoute, private router: Router, private submissionService: SubmissionService) {
    }

    ngOnInit() {

        this.route.paramMap.subscribe(value => {
            if (value.get('submissionId')) {
                this.submissionService.loadData(value.get('submissionId'));
            } else {
                this.router.navigate(['student/index']);
            }
        });
    }


    answerChanged(event: AnswerChangedEvent) {
        this.submissionService.processChangesForQuestion(event);
    }


    submit(submission: Submission) {

        this.submissionService.submitSubmission(submission, (error?) => {


            if (error) {
                
            } else {
                // This has been submitted successfully...
                this.router.navigate(['student/lesson/', submission.lesson.id]);
            }

        });


    }


}
