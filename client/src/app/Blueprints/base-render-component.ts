import {EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Question} from '../Model/question';
import {AnswerChangedEvent} from '../Events/answer-changed-event';
import {Submission} from '../Model/submission';
import {SubmissionResponse} from '../Model/submissionResponse';

export abstract class BaseRenderComponent implements OnChanges {

    @Output('answerChanged') changedEmitter = new EventEmitter();
    @Input() question: Question;
    @Input()
    public response: SubmissionResponse;


    answerDidChange(question: Question, value) {

        const changedEvent = new AnswerChangedEvent();
        changedEvent.question = question;
        changedEvent.value = value;

        this.changedEmitter.emit(changedEvent);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.response) {
            if (changes.response.currentValue) {
                this.setValue(changes.response.currentValue.response);
            }
        }
    }

    abstract setValue(value);


}
