import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AlertDialogData} from '../services/notification.service';
import {Submission} from '../Model/submission';
import {SubmissionResponse} from '../Model/submissionResponse';
import {AuthenticatedHttpClient} from '../services/authenticated-http-service.service';
import * as RecordRTC from 'recordrtc';
import {VoiceRendererComponent} from '../lessonPage/lesson-page-renderer/components/voice-renderer/voice-renderer.component';

export interface CommentDialogData {
    position: any;
    response: SubmissionResponse;
}


@Component({
    selector: 'app-comment-dialog',
    templateUrl: '../dialogs/dialog-comment-dialog.html',
})
export class CommentAddingDialogComponent {

    public options = [
        {'id': 1, 'name': 'Recording'},
        {'id': 2, 'name': 'Text'}
    ];

    typeSelect = this.options[0].id;
    textInput;


    recording = false;

    private url;

    // Lets initiate Record OBJ
    private record;

    constructor(
        public dialogRef: MatDialogRef<CommentAddingDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CommentDialogData, private http: AuthenticatedHttpClient) {
    }

    async dismiss() {

        if (this.typeSelect === 2 && this.textInput != null) {

            const form = new FormData();
            form.append('text_data', this.textInput);
            form.append('start', this.data.position.start);
            form.append('end', this.data.position.end);

            const promise = await this.http.post<any>(AuthenticatedHttpClient.COMMENT_TEXT_ADD_URL + '?responseId=' + this.data.response.id, form);
            promise.subscribe(value1 => {
                this.dialogRef.close(value1);

            });
        } else {

        }
    }

    /**
     * Start recording.
     */
    initiateRecording() {

        this.recording = true;
        const mediaConstraints = {
            video: false,
            audio: true
        };
        navigator.mediaDevices
            .getUserMedia(mediaConstraints)
            .then(this.successCallback.bind(this), this.errorCallback.bind(this));
    }

    /**
     * Will be called automatically.
     */
    successCallback(stream) {
        const options = {
            mimeType: 'audio/wav',
            numberOfAudioChannels: 1
        };

        // Start Actual Recording
        const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
        this.record = new StereoAudioRecorder(stream, options);
        this.record.record();
    }


    errorCallback(error) {

    }

    /**
     * Stop recording.
     */
    stopRecording() {
        this.recording = false;
        this.record.stop(this.processRecording.bind(this));
    }

    /**
     * processRecording Do what ever you want with blob
     * @param  {any} blob Blog
     */
    async processRecording(blob) {

        const form = new FormData();
        form.append('audio_data', blob);
        form.append('start', this.data.position.start);
        form.append('end', this.data.position.end);


        const promise = await this.http.post<any>(AuthenticatedHttpClient.COMMENT_RECORDING_ADD_URL + '?responseId=' + this.data.response.id, form);

        promise.subscribe(value1 => {
            this.url = VoiceRendererComponent.formatAsAWSUrl(value1);
            this.dialogRef.close(value1);
        });

    }


}
