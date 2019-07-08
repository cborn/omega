import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {Question} from '../../../../Model/question';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

export interface DialogData {
    question: Question;
    prompt: number;
}


@Component({
    selector: 'app-cloze-question',
    templateUrl: './cloze-question.component.html',
    styleUrls: ['./cloze-question.component.css']
})
export class ClozeQuestionComponent implements OnInit {


    @Input() question: Question;


    cachedSelection;


    constructor(public dialog: MatDialog) {
    }

    ngOnInit() {
    }


    @HostListener('window:openPrompt', ['$event'])
    onOpenPrompt(event) {
        // Run your service call here

        const dialogRef = this.dialog.open(ClozeDialogComponent, {
            height: '400px',
            width: '600px',
            data: {question: this.question, prompt: event.detail.number}
        });


    }

    updateQuestionText(field, event) {

        let childIndex = -1;
        for (let i = 0; i < getSelection().anchorNode.parentNode.childNodes.length; i++) {

            if (getSelection().anchorNode.parentNode.childNodes[i] === getSelection().anchorNode) {
                childIndex = i;
            }
        }

        this.cachedSelection = {offset: getSelection().anchorOffset, parent: getSelection().anchorNode.parentNode, childIndex: childIndex};

        const newText = event.target.innerHTML;

        let replacementText = newText;
        const regex = new RegExp(/<div contenteditable=\"false\"[\s\b\w\S]*?<\/div>/mg);
        let result;
        let instancesCount = 0;

        const regex2 = new RegExp(/openPrompt\(\d*\)/mg);
        let result2;
        const copyIndices = [];
        while ((result2 = regex2.exec(newText)) !== null) {
            copyIndices.push(parseInt(result2[0].substring(11, result2[0].length - 1))); // Work out the existing indicies that remain.
        }


        const newParams = [];


        const newInsertTextPosition = newText.indexOf('@@');
        let foundPosition = false;

        while ((result = regex.exec(newText)) !== null) {

            if (newInsertTextPosition > -1 && result.index > newInsertTextPosition && !foundPosition) {
                foundPosition = true;
                const prompts = JSON.parse(this.question.custom_properties.cloze_prompts);
                prompts.splice(instancesCount, 0, []);
                this.question.custom_properties.cloze_prompts = JSON.stringify(prompts);
            }


            replacementText = newText.replace(/<div contenteditable=\"false\"[\s\b\w\S]*?<\/div>/mg, '@@');

            newParams.push(JSON.parse(this.question.custom_properties.cloze_prompts)[copyIndices[instancesCount]]);


            instancesCount++;


        }

        if (newInsertTextPosition > -1 && !foundPosition) {
            console.log('Should insert');
            foundPosition = true;
            const prompts = JSON.parse(this.question.custom_properties.cloze_prompts);
            prompts.push([]);
            this.question.custom_properties.cloze_prompts = JSON.stringify(prompts);
        }


        if (!foundPosition) {
            // We didnt insert anything but we may well have deleted something ...
            this.question.custom_properties.cloze_prompts = JSON.stringify(newParams);
        }


        this.question.custom_properties.cloze_text = replacementText;


        setTimeout(() => {
            const currentSelection = window.getSelection();
            const range = new Range();
            try {
                range.setStart(this.cachedSelection.parent.childNodes[this.cachedSelection.childIndex], this.cachedSelection.offset);
            } catch (e) {
                try {
                    this.cachedSelection.parent.append(document.createTextNode(' '));
                    range.setStart(this.cachedSelection.parent.childNodes[this.cachedSelection.childIndex + 2], 0);
                } catch (e) {
                    range.setStart(this.cachedSelection.parent.childNodes[0], 0);
                }
            }
            // range.setEnd()

            currentSelection.removeAllRanges();
            currentSelection.addRange(range);


        }, 20);


    }

}

@Component({
    selector: 'app-dialog-cloze',
    templateUrl: 'cloze-dialog.html',
    styleUrls: ['/cloze-dialog.scss'],
})
export class ClozeDialogComponent {


    constructor(public dialogRef: MatDialogRef<ClozeQuestionComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }


    getPrompts() {
        return JSON.parse(this.data.question.custom_properties.cloze_prompts)[this.data.prompt];
    }

    getAllPrompts() {
        return JSON.parse(this.data.question.custom_properties.cloze_prompts);
    }

    deleteItem(index) {
        const list = this.getAllPrompts();
        list[this.data.prompt].splice(index, 1);
        this.data.question.custom_properties.cloze_prompts = JSON.stringify(list);

    }

    addNewItem() {
        const list = this.getAllPrompts();
        list[this.data.prompt].push('Option ' + (list[this.data.prompt].length + 1));
        this.data.question.custom_properties.cloze_prompts = JSON.stringify(list);
    }

    editInput(input, index) {
        const list = this.getAllPrompts();
        list[this.data.prompt][index] = input.target.value;
        this.data.question.custom_properties.cloze_prompts = JSON.stringify(list);
    }


}
