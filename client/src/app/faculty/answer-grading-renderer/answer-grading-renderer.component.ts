import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubmissionResponse} from '../../Model/submissionResponse';
import {Question, QuestionType} from '../../Model/question';
import {CommentAddingDialogComponent} from '../../dialogs/comment-adding-dialog';
import {MatDialog} from '@angular/material';
import {AnswerChangedEvent} from '../../Events/answer-changed-event';

@Component({
    selector: 'app-answer-grading-renderer',
    templateUrl: './answer-grading-renderer.component.html',
    styleUrls: ['./answer-grading-renderer.component.css']
})
export class AnswerGradingRendererComponent implements OnInit {


    @Input() response: SubmissionResponse;
    @Input() question: Question;

    @Output('gradeChanged')
    gradeChangedEmitter = new EventEmitter<number>();

    @Output('QuestionChanged')
    questionChanged = new EventEmitter<AnswerChangedEvent>();

    constructor(private dialog: MatDialog) {
    }

    ngOnInit() {
    }

    gradeChanged(event) {
        if (this.response.grade > this.question.max_grade) {
            this.response.grade = this.question.max_grade;
        }

        if (this.response.grade < 0) {
            this.response.grade = 0;
        }

        this.gradeChangedEmitter.emit(this.response.grade);
    }


    isBordered() {
        return this.question.type === QuestionType.MULTI_CHOICE || this.question.type === QuestionType.DROPDOWN || this.question.type === QuestionType.BOOLEAN || this.question.type === QuestionType.SCALE;
    }

    isPlainText() {
        return this.question.type === QuestionType.NUMBER || this.question.type === QuestionType.DATE || this.question.type === QuestionType.SHORT_TEXT || this.question.type === QuestionType.LONG_TEXT;
    }

    isCloze() {
        return this.question.type === QuestionType.CLOZE;
    }

    isBoolean() {
        return this.question.type === QuestionType.BOOLEAN;
    }

    isAudio() {

        return this.question.type === QuestionType.VOICE;
    }

    isPicture() {
        return this.question.type === QuestionType.PICTURE_CHOICE;
    }

    voiceQuestionChanged(event: AnswerChangedEvent) {
        this.response = event.value;
        this.questionChanged.emit(event);
    }


    addComment() {
        const dialogRef = this.dialog.open(CommentAddingDialogComponent, {
            width: '250px',
            data: {
                textOnly: true,
                response: this.response,

            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.response = result;
                var answerChanged = new AnswerChangedEvent();
                answerChanged.question = result.question;
                answerChanged.value = result;
                answerChanged.shouldReloadFromWeb = true;
                this.questionChanged.emit(answerChanged)
            }
        });

    }

}
