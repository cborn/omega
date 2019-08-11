import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LessonPage} from '../../../Model/lesson-page';
import {Submission} from '../../../Model/submission';
import {AnswerChangedEvent} from '../../../Events/answer-changed-event';

@Component({
    selector: 'app-lesson-renderer',
    templateUrl: './lesson-renderer.component.html',
    styleUrls: ['./lesson-renderer.component.css']
})
export class LessonRendererComponent implements OnInit {

    @Input() lesson: LessonPage;
    @Input() submission: Submission;
    @Input() builderView = false;


    @Output('answerChanged') changedEmitter = new EventEmitter();


    constructor() {
    }

    ngOnInit() {

    }

    answerChanged(event) {
        this.changedEmitter.emit(event);
    }


    getResponseForQuestion(question) {
        if (this.builderView) {
            return null;
        }

        return this.submission.responses.find(value => {
            return value.question.id === question.id;
        });
    }

}
