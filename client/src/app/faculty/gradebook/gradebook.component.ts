import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {LessonPageService} from '../lessonPage/lesson-page.service';
import {ActivatedRoute} from '@angular/router';
import {SubmissionService} from '../../student/submission/submission.service';
import {SubmissionResponse} from '../../Model/submissionResponse';

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


    constructor(private userService: UserService, private submissionService: SubmissionService, private lessonPageService: LessonPageService, private rt: ActivatedRoute) {
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

    getResponseForPageAndQuestion(page, question) {

        for (const submission of this.submissionService.allSubmissionsSubject.value) {
            if (submission.page.id === page.id) {
                for (const subResponse of submission.responses) {
                    if (subResponse.question.id === question.id) {
                        return subResponse;
                    }
                }
            }
        }

        return null;

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

}
