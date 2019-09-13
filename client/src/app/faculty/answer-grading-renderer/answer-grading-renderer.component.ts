import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubmissionResponse} from '../../Model/submissionResponse';
import {Question, QuestionType} from '../../Model/question';
import {CommentAddingDialogComponent} from '../../dialogs/comment-adding-dialog';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-answer-grading-renderer',
    templateUrl: './answer-grading-renderer.component.html',
    styleUrls: ['./answer-grading-renderer.component.css']
})
export class AnswerGradingRendererComponent implements OnInit {


    @Input() response: SubmissionResponse;
    @Input() question: Question;

    constructor( private dialog: MatDialog) {
    }

    ngOnInit() {
    }

    gradeChanged(event) {
        this.response.grade = Number(event.target.value);
    }


    isBordered() {
        return this.question.type === QuestionType.MULTI_CHOICE || this.question.type === QuestionType.DROPDOWN || this.question.type === QuestionType.BOOLEAN;
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


    addComment() {
        const dialogRef = this.dialog.open(CommentAddingDialogComponent, {
            width: '250px',
            data: {
                textOnly: true,
                response: this.response,

            }
        });

        dialogRef.afterClosed().subscribe(result => {
           this.response = result;
        });

    }

}
