import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AlertDialogData} from '../services/notification.service';
import {Submission} from '../Model/submission';
import {SubmissionResponse} from '../Model/submissionResponse';
import {AuthenticatedHttpClient} from '../services/authenticated-http-service.service';
import * as RecordRTC from 'recordrtc';
import {VoiceRendererComponent} from '../faculty/lessonPage/lesson-page-renderer/components/voice-renderer/voice-renderer.component';
import {Question} from '../Model/question';

export interface PromptRecordingData {
    question: Question;
}


@Component({
    selector: 'app-recording-prompt',
    templateUrl: '../dialogs/dialog-prompt-recording.html',
})
export class PromptRecordingDialogComponent {

    recording = false;

    private url;

    // Lets initiate Record OBJ
    private record;

    constructor(
        public dialogRef: MatDialogRef<PromptRecordingDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PromptRecordingData, private http: AuthenticatedHttpClient) {

    }

    async dismiss() {

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
        const promise = await this.http.post<any>(AuthenticatedHttpClient.QUESTION_PROMPT_AUDIO_URL + '/' + this.data.question.id, form);

        promise.subscribe(value1 => {
            this.url = VoiceRendererComponent.formatAsAWSUrl(value1);
            this.dialogRef.close(value1);
        });

    }


}
