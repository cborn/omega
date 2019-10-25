import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Question, QuestionType} from '../../../../../Model/question';
import {CommentAddingDialogComponent} from '../../../../../dialogs/comment-adding-dialog';
import {MatDialog} from '@angular/material';
import {PromptRecordingDialogComponent} from '../../../../../dialogs/prompt-recording-dialog';
import {AuthenticatedHttpClient} from '../../../../../services/authenticated-http-service.service';
import {$} from 'protractor';

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


    loadingPromptImage = false;

    @Input() question: Question;

    @Output() closeSidebar = new EventEmitter();
    @Output() propertyChanged = new EventEmitter();

    @ViewChild('fileInput', {static: false})
    promptImageInputElement: ElementRef;


    constructor(private dialog: MatDialog, private http: AuthenticatedHttpClient) {
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

    openRecordingInput(isFeedback: boolean) {
        const dialogRef = this.dialog.open(PromptRecordingDialogComponent, {
            width: '250px',
            data: {
                question: this.question,
                isFeedback: isFeedback
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.changed();
        });

    }


    async attachImagePrompt(event) {

        const file = event.target.files[0];
        this.promptImageInputElement.nativeElement.value = '';

        this.loadingPromptImage = true;
        const uploadData = new FormData();
        uploadData.append('image', file, 'IGNORED');
        const promise = await this.http.post<Question>(AuthenticatedHttpClient.ADD_PROMPT_IMAGE_TO_QUESTION + '/' + this.question.id, uploadData);

        promise.subscribe(value => {
            this.loadingPromptImage = false;
            console.log('changed image prompt');

            this.changed();
        }, error1 => {
            this.loadingPromptImage = false;
            console.log('ERROR');
        });


    }


}
