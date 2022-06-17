import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LessonPage} from '../../../../Model/lesson-page';
import {Submission} from '../../../../Model/submission';
import {AnswerChangedEvent} from '../../../../Events/answer-changed-event';

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
    activedStep = 0;

    prevStep(step) {
        this.activedStep = step - 1;
    }

    nextStep(step) {
        this.activedStep = step + 1;
    }

    getIconForQuestionType(type: string) {
        switch (type) {
            case 'VOICE' :
                return 'mic';
            case 'MULTI_CHOICE' :
                return 'format_list_bulleted';
            case 'CLOZE' :
                return 'app_registration';
            case 'BOOLEAN' :
                return 'toggle_on';
            case 'SHORT_TEXT' :
                return 'smart_button';
            case 'LONG_TEXT' :
                return 'notes';
            case 'BLOCK_TEXT' :
                return 'info';
            case 'PICTURE_CHOICE' :
                return 'switch_account';
            case 'SCALE' :
                return 'linear_scale';
            case 'DATE' :
                return 'calendar_month';
            case 'NUMBER' :
                return 'calculate';
            case 'DROPDOWN' :
                return 'arrow_drop_down_circle';
        }
    }

}
