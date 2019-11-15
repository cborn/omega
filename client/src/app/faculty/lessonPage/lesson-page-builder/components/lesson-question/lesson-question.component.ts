import {Component, EventEmitter, HostListener, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {Question} from '../../../../../Model/question';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {debounceTime, distinctUntilChanged, mergeMap, take} from 'rxjs/operators';
import {ClozeDialogComponent} from './cloze-question/cloze-question.component';
import {MatDialog} from '@angular/material';
import {RubyPromptEditDialogComponent} from '../../../../../dialogs/ruby-edit-dialog';
import {Subject} from 'rxjs/internal/Subject';

@Component({
    selector: 'app-lesson-question',
    templateUrl: './lesson-question.component.html',
    styleUrls: ['./lesson-question.component.css']
})
export class LessonQuestionComponent implements OnInit {

    // @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;
    @ViewChild('autosize2', {static: false}) autosize2: CdkTextareaAutosize;

    @Input() question: Question;

    @Input() selectedQuestion: number;
    @Input() formatter_displayed: boolean;


    @Output() questionSelected = new EventEmitter();
    @Output() questionDeleted = new EventEmitter();
    @Output() questionChanged = new EventEmitter();
    @Output() text_selection = new EventEmitter();
    cachedNameSelection;

    questionNameChanged = new Subject<string>();

    clickStartPosition: number;
    formatter_position_x: number;
    formatter_position_y: number;

    selection: Selection;



    constructor(private _ngZone: NgZone, public dialog: MatDialog) {
    }


    @HostListener('window:openRubyEditPrompt', ['$event'])
    onOpenPrompt(event) {
        // Run your service call here

        if (event.detail.questionId === this.question.id) {
            const dialogRef = this.dialog.open(RubyPromptEditDialogComponent, {
                height: '400px',
                width: '600px',
                data: {question: this.question, index: event.detail.index}
            });

            dialogRef.afterClosed().subscribe(value => {
                this.isChanged();
            });
        }
    }

    markStartPosition(event) {
        this.clickStartPosition = event.clientX;
    }


    emboldenText() {

    }



    checkTextSelection(event) {

        this.selection = window.getSelection();

        if (this.selection.baseOffset !== this.selection.extentOffset) {
            this.text_selection.emit({shown: true, id: this.question.id});

            if(this.clickStartPosition < event.clientX) {
                // We're going from right to left.

                const deltaX = (event.clientX - this.clickStartPosition) / 2;
                this.formatter_position_x = (this.clickStartPosition + deltaX) - 53;
            }
            else {
                const deltaX = (this.clickStartPosition - event.clientX) / 2;
                this.formatter_position_x = (event.clientX + deltaX) - 53;
            }

            this.formatter_position_y = event.clientY - 80;

        } else {
            this.text_selection.emit({shown: false, id: this.question.id});
        }


    }


    nameChanged(field, event) {
        this.questionNameChanged.next(event.target.innerHTML);
    }

    getRubyEnclosedText(newText: string) {
        let replacementText = newText;
        const regex = new RegExp(/<div contenteditable=\"false\"[\s\b\w\S]*?<\/div>/mg);
        let result;
        while ((result = regex.exec(newText)) !== null) {

            const rubyContent = result[0].replace(/<(\/)?div.*?>/gm, '');
            const rubyBody = rubyContent.slice(0, rubyContent.indexOf('('));
            const rubyDetail = rubyContent.slice(rubyContent.indexOf('(') + 1, rubyContent.indexOf(')'));
            const rubyReplacement = '<ruby>' + rubyBody + '<rt>' + rubyDetail + '</rt></ruby>';

            replacementText = replacementText.replace(result[0], rubyReplacement);

        }

        return replacementText;
    }

    handleCursorPositioning() {
        let childIndex = -1;
        for (let i = 0; i < getSelection().anchorNode.parentNode.childNodes.length; i++) {

            if (getSelection().anchorNode.parentNode.childNodes[i] === getSelection().anchorNode) {
                childIndex = i;
            }
        }

        this.cachedNameSelection = {
            offset: getSelection().anchorOffset,
            parent: getSelection().anchorNode.parentNode,
            childIndex: childIndex
        };

        setTimeout(() => {
            const currentSelection = window.getSelection();
            const range = new Range();
            try {
                range.setStart(this.cachedNameSelection.parent.childNodes[this.cachedNameSelection.childIndex], this.cachedNameSelection.offset);
            } catch (e) {
                try {
                    this.cachedNameSelection.parent.append(document.createTextNode(' '));
                    range.setStart(this.cachedNameSelection.parent.childNodes[this.cachedNameSelection.childIndex + 2], 0);
                } catch (e) {
                    range.setStart(this.cachedNameSelection.parent.childNodes[0], 0);
                }
            }
            // range.setEnd()

            currentSelection.removeAllRanges();
            currentSelection.addRange(range);


        }, 40);

    }


    updateQuestionName(newText) {

        this.handleCursorPositioning();
        /**
         * Above code is for handling the cursor positioning.
         */

        this.question.name = this.getRubyEnclosedText(newText);

        this.isChanged();


    }


    ngOnInit() {

        this.questionNameChanged.pipe(debounceTime(1000)).pipe(distinctUntilChanged())
            .subscribe((value) => {
                this.updateQuestionName(value);

            });


        this._ngZone.onStable.pipe(take(1))
            .subscribe(() => {
                // this.autosize.resizeToFitContent(true);
                if (this.autosize2 != null) {
                    this.autosize2.resizeToFitContent(true);
                }
            });

    }

    isChanged() {
        this.questionChanged.emit(true);
    }

    toggleSidebar() {
        this.questionSelected.emit(this.question);
    }

    isSelected() {
        return this.selectedQuestion === this.question.id;
    }

    delete() {
        this.questionDeleted.emit(this.question);
    }

}
