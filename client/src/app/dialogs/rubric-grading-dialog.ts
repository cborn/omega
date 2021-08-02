import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AlertDialogData} from '../services/notification.service';
import {Submission} from '../Model/submission';
import {SubmissionResponse} from '../Model/submissionResponse';
import {AuthenticatedHttpClient} from '../services/authenticated-http-service.service';
import * as RecordRTC from 'recordrtc';
import {VoiceRendererComponent} from '../faculty/lessonPage/lesson-page-renderer/components/voice-renderer/voice-renderer.component';
import {Question} from '../Model/question';

@Component({
    selector: 'app-rubric-grading',
    templateUrl: 'dialog-rubric-grading-dialog.html',
})
export class RubricGradingDialog {


    gradingType = '';

    constructor() {


    }


}
