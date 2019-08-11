import {Component, Input, OnInit} from '@angular/core';
import {BaseRenderComponent} from '../../../../Blueprints/base-render-component';
import * as RecordRTC from 'recordrtc';
import * as $ from 'jquery';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthenticatedHttpClient} from '../../../../services/authenticated-http-service.service';
import {PERMISSION_ROLE, SessionManagerService} from '../../../../services/session-manager.service';


@Component({
    selector: 'app-voice-renderer',
    templateUrl: './voice-renderer.component.html',
    styleUrls: ['./voice-renderer.component.css']
})
export class VoiceRendererComponent extends BaseRenderComponent implements OnInit {

    constructor(private domSanitizer: DomSanitizer, private http: AuthenticatedHttpClient, private sessionManager: SessionManagerService) {
        super();
    }

    @Input() isReal = true;

    @Input() submission;

    // Lets initiate Record OBJ
    private record;
    // Will use this flag for detect recording
    private recording = false;
    // Url of Blob
    private url;
    private error;

    private audioBuffer;
    private duration;
    private canvasContext: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private heightArray = [];
    private container: any;


    // AUDIO CONTROLS
    private playing = false;
    private currentSource;
    private audioContext = new AudioContext();
    private currentPlayPos = 0;
    private lastUpdate;
    private animator = setInterval(() => {
        this.update();
    }, 5);


    // Highlight controls
    private startHighlight;
    private endHighlight;
    private highlight = false;
    private stopAt = null;
    private repeatAt = null;
    private repeatStart = null;

    private context = new AudioContext();

    loading = false;


    static formatAsAWSUrl(value) {
        return 'https://s3-eu-central-1.amazonaws.com/omegadev/audio/' + value;
    }


    ngOnInit() {
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
            this.setValue(value1.message);

        });

    }

    /**
     * Process Error.
     */
    errorCallback(error) {
        this.error = 'Can not play audio in your browser';
    }


    setValue(value) {
        this.url = VoiceRendererComponent.formatAsAWSUrl(value);
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
            that.highLightTo(that.getCursorPosition(e).x);
        });
        $(document).on('mouseup', function (e) {
            $(document).off('mousemove');
            $(document).off('mouseup');
        });
    }

    highLightTo(xPos) {
        this.highlight = true;
        this.endHighlight = xPos;
    }

    async loadVisualisation(context) {
        try {

            this.loading = false;
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
                context.context.decodeAudioData(xhr.response, (audioBuffer) => {
                    context.audioBuffer = audioBuffer;
                    context.duration = audioBuffer.duration;
                    const rawData = audioBuffer.getChannelData(0);
                    const audioSize = rawData.length;
                    const soundStep = audioSize / (context.canvas.width - 24);
                    context.canvasContext.fillStyle = '#3193bb';
                    for (let i = 0; i < context.canvas.width - 24; i++) {
                        const height = Math.round(rawData[Math.round(i * soundStep)] * 20);
                        context.heightArray.push(height);
                        context.canvasContext.fillRect(i + 12, context.canvas.height / 2 - height, 1, 2 * height + 1);
                    }


                });
            };
            xhr.send();
        } catch (e) {
            console.log(e);
            setTimeout(context.loadVisualisation, 1000, context);
        }
    }


    update() {
        try {
            if (this.playing) {
                this.currentPlayPos = this.currentPlayPos + window.performance.now() - this.lastUpdate;
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
            this.canvasContext.fillStyle = '#3193bb';
            const cursorx = (this.currentPlayPos / (this.duration * 1000)) * (this.canvas.width - 24) + 12;
            this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (let i = 0; i < this.canvas.width - 24; i++) {
                const height = this.heightArray[i];
                this.canvasContext.fillRect(i + 12, this.canvas.height / 2 - height, 1, 2 * height + 1);
            }

            this.canvasContext.fillStyle = 'white';
            this.canvasContext.fillRect(cursorx, 6, 1, this.canvas.height - 12);
            // if (this.commentData) {
            //     for (let i = 0; i < this.commentData.length; i++) {
            //         if (i === this.curTrackingComment) {
            //             continue;
            //         }
            //         const popupId = '#popup-{QOID}-{CID}'.replace('{QOID}', String(this.question.id)).replace('{CID}', String(i));
            //         const curPopUp = $(popupId);
            //         //const xLoc = (parseFloat(this.commentData[i]['time'])/(this.duration*1000))*(this.canvas.width - 24) + (this.canvas.offsetLeft - 35);
            //         const xLoc = this.getCommentLocation(parseFloat(this.commentData[i]['time']));
            //         curPopUp.css({top: 2, left: Math.round(xLoc)});
            //     }
            // }
            if (this.highlight) {
                this.canvasContext.fillStyle = 'rgba(255, 255, 255, 0.5)';
                this.canvasContext.fillRect(this.startHighlight, 0, this.endHighlight - this.startHighlight, this.canvas.height);
            }

        } catch (e) {

        }
    }


    /*

    AUDIO CONTROLS

     */

    play() {
        if (this.playing) {
            return;
        }
        this.playing = true;
        this.currentSource = this.audioContext.createBufferSource();
        this.currentSource.buffer = this.audioBuffer;
        this.currentSource.connect(this.audioContext.destination);
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
