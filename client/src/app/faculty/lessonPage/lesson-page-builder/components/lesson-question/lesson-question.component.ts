import {Component, EventEmitter, HostListener, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {Question} from '../../../../../Model/question';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {debounceTime, distinctUntilChanged, mergeMap, take} from 'rxjs/operators';
import {ClozeDialogComponent} from './cloze-question/cloze-question.component';
import {MatDialog} from '@angular/material';
import {RubyPromptEditDialogComponent} from '../../../../../dialogs/ruby-edit-dialog';
import {Subject} from 'rxjs/internal/Subject';

export class QuestionChangedEvent {

    constructor(text, field?) {
        this.text = text;
        if(field)
            this.field = field;
    }


    text: string;
    field: any;
}

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

    questionNameChanged = new Subject<QuestionChangedEvent>();

    clickStartPosition: number;
    formatter_position_x: number;
    formatter_position_y: number;

    selection_start: number;
    selection_end: number;
    inside_bold_tag:boolean;



    constructor(private _ngZone: NgZone, public dialog: MatDialog) {
    }


    @HostListener('window:openRubyEditPrompt', ['$event'])
    onOpenPrompt(event) {
        // Run your service call here


        if (event.detail.questionId === this.question.id) {
            console.log(this.question);
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
        console.log("Bolden called");
        const existing_text = this.question.name.substring(this.selection_start, this.selection_end);


        const before_text = this.question.name.substring(0,this.selection_start);
        if (before_text.indexOf("<b>") > -1 && before_text.indexOf("</b>") === -1) {
            // its already bold so dont carry on
            return;
        }
        const end_text = this.question.name.substring(this.selection_end,this.question.name.length);

        this.question.name = before_text + "<b>" + existing_text + "</b>" + end_text;

        console.log(this.question.name);
    }


    getActualParentNode(node) {

       if(node.parentElement.hasAttribute('contenteditable')) {
           return (node.parentElement);
       }
       else
           return this.getActualParentNode(node.parentElement);
    }


    getOffsetForChildNode(node, anchor,innerChild): number {

        var done = false;
        var offset = 0;

        for(const i in node.childNodes) {
            if (node.childNodes.hasOwnProperty(i)) {

                const childNode = node.childNodes[i];
                console.log(childNode);
                if (childNode.hasChildNodes()) {
                    offset += this.getOffsetForChildNode(childNode, anchor, true);
                    offset += 7;

                } else {

                    if (childNode === anchor) {
                        // this is the one.
                        done = true;
                        if(innerChild) {
                            // this is inside a bold tag so dont show bolden stuff.
                            this.inside_bold_tag = true;
                        }
                    } else if (!done) {
                        if (childNode.outerHTML !== undefined) {
                            offset += childNode.outerHTML.length;
                        } else {
                            offset += childNode.textContent.length;
                        }

                    }

                }
            }
        }

        return offset;

    }

    checkTextSelection(event) {

        var offset = 0;
        this.inside_bold_tag = false;

        const parent = this.getActualParentNode(getSelection().anchorNode);

        offset = this.getOffsetForChildNode(parent, getSelection().anchorNode,false);

        console.log(offset);

        this.selection_start =  offset + getSelection().getRangeAt(0).startOffset;
        this.selection_end = offset + getSelection().getRangeAt(0).endOffset;


        console.log(this.selection_start,this.selection_end);

        if (this.selection_start !== this.selection_end && !this.inside_bold_tag) {
            this.text_selection.emit({shown: true, id: this.question.id});

            if (this.clickStartPosition < event.clientX) {
                // We're going from right to left.

                const deltaX = (event.clientX - this.clickStartPosition) / 2;
                this.formatter_position_x = (this.clickStartPosition + deltaX) - 53;
            } else {
                const deltaX = (this.clickStartPosition - event.clientX) / 2;
                this.formatter_position_x = (event.clientX + deltaX) - 53;
            }

            this.formatter_position_y = event.clientY - 80;




        } else {
            this.text_selection.emit({shown: false, id: this.question.id});
        }


    }


    nameChanged(field, event) {
        const questionEvent = new QuestionChangedEvent(event.target.innerHTML, field);
        this.questionNameChanged.next(questionEvent);
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
        if (getSelection().anchorNode != null) {
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

        this.questionNameChanged.pipe(debounceTime(3000)).pipe(distinctUntilChanged())
            .subscribe((value) => {
                // if the user is in the middle of typing an accent dont update the field.
                console.log("Name changed to : "+ value.text);
                this.updateQuestionName(value.text);
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
