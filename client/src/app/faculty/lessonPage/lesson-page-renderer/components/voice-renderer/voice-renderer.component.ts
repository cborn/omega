import {Component, Input, OnInit, Output} from '@angular/core';
import {BaseRenderComponent} from '../../../../../Blueprints/base-render-component';
import * as RecordRTC from 'recordrtc';
import * as $ from 'jquery';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthenticatedHttpClient} from '../../../../../services/authenticated-http-service.service';
import {PERMISSION_ROLE, SessionManagerService} from '../../../../../services/session-manager.service';
import {AlertDialogComponent} from '../../../../../services/notification.service';
import {CommentAddingDialogComponent} from '../../../../../dialogs/comment-adding-dialog';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ResponseComment} from '../../../../../Model/response-comment';


@Component({
    selector: 'app-voice-renderer',
    templateUrl: './voice-renderer.component.html',
    styleUrls: ['./voice-renderer.component.css']
})
export class VoiceRendererComponent extends BaseRenderComponent implements OnInit {

    constructor(private domSanitizer: DomSanitizer, private http: AuthenticatedHttpClient, private sessionManager: SessionManagerService, private dialog: MatDialog) {
        super();
    }

    static audioContext = new AudioContext();

    @Input() isReal = true;
    @Input() isGrading = false;


    @Input() submission;

    // Lets initiate Record OBJ
    private record;
    // Will use this flag for detect recording
    private recording = false;
    // Url of Blob
    private url;
    private rawValue;
    private error;

    private audioBuffer;
    private duration;
    private canvasContext: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private heightArray = [];
    private container: any;
    private hasRecording = false;
    private redrawIsRequired = true;


    // AUDIO CONTROLS
    private playing = false;
    private currentSource;

    private currentPlayPos = 0;
    private oldPlayPos = -1;
    private lastUpdate;

    private animator;


    // Highlight controls
    private startHighlight = 0;
    private endHighlight = 0;
    private highlight = false;
    private stopAt = null;
    private repeatAt = null;
    private repeatStart = null;

    // Comment controls

    private showAddCommentDialog = false;
    private commentPosition = {};
    private selectedComment = -1;


    loading = false;


    static formatAsAWSUrl(value, bucket, region) {
        return 'https://s3-' + region + '.amazonaws.com/' + bucket + '/audio/' + value;
    }


    ngOnInit() {

        if (this.isReal) {
            this.animator = setInterval(() => {
                this.update();
            }, 33);
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

        if (this.question.prompts != null && this.question.prompts.audioPrompt && this.question.custom_properties.prompt_sync) {
            // Start the prompt audio..
            const prompt = $('#prompt_' + this.question.id);

            prompt[0].play();
        }
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
        this.loading = true;

        const promise = await this.http.post<any>(AuthenticatedHttpClient.RECORDING_ADD_URL + '?submissionId=' + this.submission.id + '&questionId=' + this.question.id, form);

        promise.subscribe(value1 => {
            this.answerDidChange(this.question, value1.message, true);
            // this.setValue(value1.message);
        });

    }

    /**
     * Process Error.
     */
    errorCallback(error) {
        this.error = 'Can not play audio in your browser';
    }


    setValue(value) {
        this.hasRecording = true;
        this.showAddCommentDialog = false;
        this.rawValue = value;
        this.url = VoiceRendererComponent.formatAsAWSUrl(value, this.sessionManager.bucket, this.sessionManager.region);
        this.loadVisualisation(this);
    }


    onCanvasClick(event) {

        const coords = this.getCursorPosition(event);

        if (coords.x > 6 && coords.x < this.canvas.width - 12) {
            const prePlay = this.playing;
            this.stop();
            this.currentPlayPos = ((coords.x - 12) / (this.canvas.width - 24)) * this.duration * 1000;
            if (prePlay) {
                this.play();
            }
        }


    }

    onCanvasMouseDown(event) {

        console.log(event);

        if (!this.sessionManager.checkRoles(PERMISSION_ROLE.ROLE_GRADER)) {
            return;
        }

        const coords = this.getCursorPosition(event);

        this.startHighlight = coords.x;
        this.endHighlight = coords.x;
        this.highlight = false;
        this.stopAt = null;
        this.repeatAt = null;
        this.repeatStart = null;
        const that = this;


        $(document).on('mousemove', function (e) {
            console.log('mouseMoved');
            that.highLightTo(that.getCursorPosition(e).x, that);

        });

        $(document).on('mouseup', function (e) {
            if (!that.playing) {
                that.openCommentPrompt(that.getCursorPosition(e));
            }
            $(document).off('mousemove');
            $(document).off('mouseup');
        });
    }

    openCommentPrompt(position) {
        if (this.highlight) {
            this.commentPosition = {
                start: this.startHighlight,
                end: this.endHighlight
            };
        } else {
            this.commentPosition = {
                start: position.x,
                end: position.x
            };
        }

        this.showAddCommentDialog = true;
    }

    addNewComment() {

        const dialogRef = this.dialog.open(CommentAddingDialogComponent, {
            width: '250px',
            data: {
                position: this.commentPosition,
                response: this.response
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.answerDidChange(this.question, result);
        });

    }


    highLightTo(xPos, context?) {
        if (context) {
            context.redrawIsRequired = true;
            context.highlight = true;
            context.endHighlight = xPos;
        } else {
            this.redrawIsRequired = true;
            this.highlight = true;
            this.endHighlight = xPos;
        }

    }

    async loadVisualisation(context) {

        try {

            context.loading = false;
            context.container = document.getElementById('container_' + context.question.id);
            context.canvas = document.getElementById('canvas_' + context.question.id);
            context.canvasContext = context.canvas.getContext('2d');

            context.canvas.width = (context.container.offsetWidth);
            context.canvas.height = 70;
            context.heightArray = [];


            /* Create a new XHR object. */
            const xhr = new XMLHttpRequest();
            /* Open a GET request connection to the .mp3 */
            xhr.open('GET', context.url, true);
            /* Set the XHR responseType to arraybuffer */
            xhr.responseType = 'arraybuffer';
            xhr.onload = () => {
                /* The files arraybuffer is available at xhr.response */
                VoiceRendererComponent.audioContext.decodeAudioData(xhr.response, (audioBuffer) => {
                    context.audioBuffer = audioBuffer;
                    context.duration = audioBuffer.duration;
                    const rawData = audioBuffer.getChannelData(0);
                    const audioSize = rawData.length;
                    const soundStep = audioSize / (context.canvas.width - 24);
                    // context.canvasContext.fillStyle = '#3193bb';
                    for (let i = 0; i < context.canvas.width - 24; i++) {
                        const height = Math.round(rawData[Math.round(i * soundStep)] * 20);
                        context.heightArray.push(height);
                        // context.canvasContext.fillRect(i + 12, context.canvas.height / 2 - height, 1, 2 * height + 1);
                    }
                    context.redrawIsRequired = true;
                });
            };
            xhr.send();
        } catch (e) {
            setTimeout(context.loadVisualisation, 1000, context);
        }
    }


    update() {
        try {
            if (this.playing) {
                this.showAddCommentDialog = false;
                this.currentPlayPos = this.currentPlayPos + window.performance.now() - this.lastUpdate;
                this.redrawIsRequired = true;
            }

            if (this.currentPlayPos !== this.oldPlayPos) {
                this.redrawIsRequired = true;
            }

            this.lastUpdate = window.performance.now();
            if (this.currentPlayPos > (this.duration * 1000)) {
                this.playing = false;
                this.currentPlayPos = 0;
            }
            if (this.stopAt) {
                if (this.currentPlayPos > this.stopAt) {
                    this.stop();
                    this.stopAt = null;
                }
            }
            if (this.repeatAt) {
                if (this.currentPlayPos > this.repeatAt) {
                    this.stop();
                    this.currentPlayPos = this.repeatStart;
                    this.play();
                }
            }

            if (this.redrawIsRequired) {
                this.oldPlayPos = this.currentPlayPos;
                this.canvasContext.fillStyle = '#3193bb';
                const cursorx = (this.currentPlayPos / (this.duration * 1000)) * (this.canvas.width - 24) + 12;
                this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

                for (let i = 0; i < this.canvas.width - 24; i++) {
                    const height = this.heightArray[i];
                    this.canvasContext.fillRect(i + 12, this.canvas.height / 2 - height, 1, 2 * height + 1);
                }

                this.canvasContext.fillStyle = '#3193bb';
                this.canvasContext.fillRect(cursorx, 6, 1, this.canvas.height - 12);

                // Render the highlight now.
                if (this.highlight) {
                    this.canvasContext.fillStyle = 'rgb(0,0,0,0.1)';
                    this.canvasContext.fillRect(this.startHighlight, 0, this.endHighlight - this.startHighlight, this.canvas.height);
                }
                this.redrawIsRequired = false;
            }

        } catch (e) {
            this.redrawIsRequired = true;
        }
    }


    getLinkForAudioClip(clip) {
        return VoiceRendererComponent.formatAsAWSUrl(clip, this.sessionManager.bucket, this.sessionManager.region);
    }

    selectComment(comment: ResponseComment) {
        console.log('select');
        this.selectedComment = comment.id;
        this.setHighlight(comment.location, comment.endLocation);
        this.showAddCommentDialog = false;
    }

    deSelectComment(event) {
        event.stopPropagation();
        console.log('deselect');
        this.selectedComment = -1;
        this.unsetHighlight();
        this.showAddCommentDialog = false;

    }

    setHighlight(start, end) {
        this.startHighlight = start;
        this.endHighlight = end;
        this.highlight = true;
        this.redrawIsRequired = true;
    }

    unsetHighlight() {
        this.startHighlight = 0;
        this.endHighlight = 0;
        this.highlight = false;
        this.redrawIsRequired = true;
    }


    getCommentLocation(start, end) {
        // 67 comes from width of comment tags to place caret in right location
        let halfDiff = 0;
        if (start !== end) {
            // get the middle of the comment highlight.
            halfDiff = (end - start) / 2;
        }

        return (end + (this.canvas.offsetLeft)) - halfDiff;
    }


    /*

    AUDIO CONTROLS

     */

    play() {
        if (this.playing) {
            return;
        }
        this.playing = true;
        this.currentSource = VoiceRendererComponent.audioContext.createBufferSource();
        this.currentSource.buffer = this.audioBuffer;
        this.currentSource.connect(VoiceRendererComponent.audioContext.destination);
        this.currentSource.start(0, this.currentPlayPos / 1000);
    }

    stop() {
        this.playing = false;
        if (this.currentSource) {
            this.currentSource.stop();
        }
        this.currentSource = null;
    }


    getCursorPosition(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        return {x: x, y: y};
    }

}
