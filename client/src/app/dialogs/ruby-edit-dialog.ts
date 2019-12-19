import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AlertDialogData} from '../services/notification.service';
import {Submission} from '../Model/submission';
import {SubmissionResponse} from '../Model/submissionResponse';
import {AuthenticatedHttpClient} from '../services/authenticated-http-service.service';
import * as RecordRTC from 'recordrtc';
import {VoiceRendererComponent} from '../faculty/lessonPage/lesson-page-renderer/components/voice-renderer/voice-renderer.component';
import {Question} from '../Model/question';

export interface RubyEditDialogData {
    question: Question;
    index: number;
}


@Component({
    selector: 'app-ruby-dialog',
    templateUrl: 'dialog-ruby-edit-dialog.html',
})
export class RubyPromptEditDialogComponent {


    question: Question;
    rubyEditIndex: number;

    rubyBody: string;
    rubyDetail: string;


    constructor(
        public dialogRef: MatDialogRef<RubyPromptEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: RubyEditDialogData, private http: AuthenticatedHttpClient) {

        this.question = data.question;
        this.rubyEditIndex = data.index;

        const rubyText = this.getRubyText();

        this.rubyBody = rubyText.replace(/<(\/)?ruby>/gm, '').replace(/<rt>(.)*<\/rt>/gm, '').trim();
        this.rubyDetail = rubyText.substring(rubyText.indexOf('<rt>') + 4, rubyText.indexOf('</rt>')).trim();

    }


    getRubyText() {

        const regex = /<ruby>(.|\n)*?<\/ruby>/gm;
        let result;
        let index = 0;
        while ((result = regex.exec(this.question.name)) !== null) {
            if (index === this.rubyEditIndex) {

                return result[0];
            }

            index++;

        }

        return '';


    }

    async dismiss() {

        const regex = /<ruby>(.|\n)*?<\/ruby>/gm;
        let result;
        let index = 0;
        while ((result = regex.exec(this.question.name)) !== null) {
            if (index === this.rubyEditIndex) {
                this.question.name = this.question.name.slice(0, result.index) + '<ruby>' + this.rubyBody + '<rt>' + this.rubyDetail + '</rt></ruby>' + this.question.name.slice(result.index + result[0].length);
                this.dialogRef.close();

            }

            index++;

        }


    }

}
