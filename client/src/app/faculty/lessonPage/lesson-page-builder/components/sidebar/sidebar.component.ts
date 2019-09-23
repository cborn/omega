import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Question, QuestionType} from '../../../../../Model/question';
import {CommentAddingDialogComponent} from '../../../../../dialogs/comment-adding-dialog';
import {MatDialog} from '@angular/material';
import {PromptRecordingDialogComponent} from '../../../../../dialogs/prompt-recording-dialog';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


    questionTypes = Question.questionTypeList();

    get QuestionType() {
        return QuestionType;
    }

    @Input() question: Question;

    @Output() closeSidebar = new EventEmitter();
    @Output() propertyChanged = new EventEmitter();



    constructor( private dialog: MatDialog) {
    }

    ngOnInit() {
    }

    closeSidebarAction() {
        this.closeSidebar.emit(true);
    }

    isOfType(options: QuestionType[]) {
        return options.indexOf(this.question.type) > -1;

    }

    isNotOfType(options: QuestionType[]) {

        return options.indexOf(this.question.type) <= -1;

    }

    changed() {
        this.propertyChanged.emit(true);
    }

    openPromptRecordingInput() {
        console.log(this.question);

        const dialogRef = this.dialog.open(PromptRecordingDialogComponent, {
            width: '250px',
            data: {
                question: this.question
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.changed();
        });

    }

}
