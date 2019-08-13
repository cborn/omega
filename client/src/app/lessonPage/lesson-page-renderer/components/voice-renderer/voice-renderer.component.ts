import {Component, Input, OnInit} from '@angular/core';
import {BaseRenderComponent} from '../../../../Blueprints/base-render-component';
import * as RecordRTC from 'recordrtc';
import * as $ from 'jquery';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthenticatedHttpClient} from '../../../../services/authenticated-http-service.service';
import {PERMISSION_ROLE, SessionManagerService} from '../../../../services/session-manager.service';
import {AlertDialogComponent} from '../../../../services/notification.service';
import {CommentAddingDialogComponent} from '../../../../dialogs/comment-adding-dialog';
import {MatDialog, MatDialogRef} from '@angular/material';


@Component({
    selector: 'app-voice-renderer',
    templateUrl: './voice-renderer.component.html',
    styleUrls: ['./voice-renderer.component.css']
})
export class VoiceRendererComponent extends BaseRenderComponent implements OnInit {

    constructor(private domSanitizer: DomSanitizer, private http: AuthenticatedHttpClient, private sessionManager: SessionManagerService, private dialog: MatDialog) {
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
    private hasRecording = false;


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

    // Comment controls

    private currentTrackingComment = -1;
    private showAddCommentDialog = false;
    private commentPosition = {};


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
        this.hasRecording = true;
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

        // TODO ADD BACK IN if (!this.sessionManager.checkRoles(PERMISSION_ROLE.ROLE_GRADER)) {
        //     return;
        // }

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
            that.openCommentPrompt(that.getCursorPosition(e));
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
            console.log(result);
        });

    }


    highLightTo(xPos) {
        this.highlight = true;
        this.endHighlight = xPos;
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
                context.audioContext.decodeAudioData(xhr.response, (audioBuffer) => {
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

                    context.addCommentsIntoWaveform();


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

            this.canvasContext.fillStyle = '#3193bb';
            this.canvasContext.fillRect(cursorx, 6, 1, this.canvas.height - 12);

            // Render the current comment box..
            if (this.response.comments.length > 0) {
                for (let i = 0; i < this.response.comments.length; i++) {
                    if (i !== this.currentTrackingComment) {
                        break;
                    }

                    console.log('this is the current comment...');


                    const popupId = '#popup-{QOID}-{CID}'.replace('{QOID}', String(this.question.id)).replace('{CID}', String(i));
                    const curPopUp = $(popupId);
                    const xLoc = this.getCommentLocation(this.response.comments[i].location);
                    curPopUp.css({top: 2, left: Math.round(xLoc)});
                }
            }

            // Render the highlight now.
            if (this.highlight) {
                this.canvasContext.fillStyle = 'rgb(0,0,0,0.1)';
                this.canvasContext.fillRect(this.startHighlight, 0, this.endHighlight - this.startHighlight, this.canvas.height);
            }

        } catch (e) {

        }
    }

    addCommentsIntoWaveform() {

        // const popupTemplate = '<div class="badge badge-popup with-carat" small id="popup-{QOID}-{CID}">{AUTHOR}</div>';
        // let phtml = '';
        // for (let i = 0; i < this.response.comments.length; i++) {
        //     const chtml = popupTemplate.replace('{QOID}', String(this.question.id))
        //         .replace('{CID}', String(i))
        //         .replace('{AUTHOR}', String(this.response.comments[i]['author']));
        //     phtml = phtml + chtml;
        // }
        // $('#popups_' + this.question.id).html(phtml);
        // for (let i = 0; i < this.response.comments.length; i++) {
        //     // magic numbers for comment placement
        //     // const xLoc = (parseFloat(this.response.comments[i]['time'])/(this.duration*1000))*(this.canvas.width - 24) + (this.canvas.offsetLeft - 55);
        //     const xLoc = this.getCommentLocation(parseFloat(this.response.comments[i]['time']));
        //     const popupId = '#popup-{QOID}-{CID}'.replace('{QOID}', String(this.question.id)).replace('{CID}', String(i));
        //     const curPopUp = $(popupId);
        //     curPopUp.css({top: 2, left: Math.round(xLoc)});
        //     curPopUp.css({height: 17});
        //     curPopUp.data('author', this.response.comments[i]['author']);
        //     curPopUp.data('message', this.response.comments[i]['data']);
        //     curPopUp.data('uid', this.response.comments[i]['uid']);
        //     curPopUp.data('type', this.response.comments[i]['type']);
        //     curPopUp.data('small', 'true');
        //     curPopUp.data('highlighting', 'false');
        //     curPopUp.data('time', this.response.comments[i]['time']);
        //     curPopUp.data('endTime', this.response.comments[i]['endTime']);
        //     curPopUp.data('index', i);
        //     curPopUp.data('id', this.response.comments[i]['id']);
        //     curPopUp.data('dragging', false);
        //     curPopUp.on('mouseenter', function () {
        //         curPopUp.data('highlighting', 'true');
        //         this.setHighlight($(this).data('time'), $(this).data('endTime'));
        //     });
        //     curPopUp.on('mouseout', function () {
        //         // this.highlight = false;
        //         curPopUp.data('highlighting', 'false');
        //     });
        //     const handleResize = function () {
        //         if ($(this).data('dragging') === true) {
        //             return;
        //         }
        //         if ($(this).data('small') === 'true') {
        //             $(this).data('small', 'false');
        //
        //             const author = $(this).data('author');
        //             const message = $(this).data('message');
        //             const type = $(this).data('type');
        //             const close = '<button class=\'btn btn-danger btn-close-comment\' cid=\'' + $(this).data('id') +
        //                 '\'><span class=\'btn-close-comment-interior\'>&times;</span></button>';
        //             let del = '<button class=\'btn btn-danger btn-sm btn-delete-comment\' cid=\'' + $(this).data('id') +
        //                 '\'><span class=\'glyphicon glyphicon-trash btn-delete-comment-interior\'></span></button>';
        //             // keep in imprecise javascript comparison, it is necessary here as one
        //             // is string and one is int
        //             if ($(this).data('uid') !== $('#uid-global').val()) {
        //                 del = '';
        //             }
        //             if (type === 'string') {
        //
        //                 $(this).css({height: 'auto', width: 200, 'z-index': 1});
        //                 $(this).html(author + ':' + del + '<br>&nbsp;' + message);
        //
        //                 $(this).removeClass('with-carat');
        //             } else {
        //                 const audioControls = '<div style=\'z-index:10;\'><audio class=\'audio-controller\' controls><source src=\'{DATA}\'></source></audio></div>'.replace('{DATA}', message);
        //                 $(this).html(author + ':' + close + '<br>&nbsp;' + audioControls + del);
        //                 $('.audio-controller').off();
        //                 $('.audio-controller').on('click', function (evt) {
        //                     evt.stopPropagation();
        //                 });
        //                 $(this).css({height: 'auto', width: 400, 'z-index': 1});
        //             }
        //             $('.btn-close-comment').on('click', handleResize);
        //             $('.btn-delete-comment').on('click', function () {
        //                 if (confirm('Do you want to delete this comment?')) {
        //                     this.deleteComment($(this).attr('cid'));
        //                 }
        //             });
        //         } else {
        //             $(this).data('small', 'true');
        //             const author = $(this).data('author');
        //             $(this).html(author);
        //             $(this).css({height: 17, width: 'auto', 'z-index': 0});
        //             $(this).addClass('with-carat');
        //         }
        //     };
        //     curPopUp.on('click', handleResize);
        //     curPopUp.on('mousedown', function () {
        //         const index = $(this).data('index');
        //         this.curTimeOut = setTimeout(function () {
        //             this.addTrackingComment(index);
        //         }, 200);
        //         $(document).on('mouseup', function () {
        //             clearTimeout(this.curTimeOut);
        //             setTimeout(function () {
        //                 this.removeTrackingComment();
        //             }, 50);
        //         });
        //     });
        // }
    }


    setHighlight(start, end) {
        const s = this.getAbsoluteLocation(start);
        const e = this.getAbsoluteLocation(end);
        this.startHighlight = s;
        this.endHighlight = e;
        this.highlight = true;
    }


    getCommentLocation(time) {
        console.log(time);
        // 67 comes from width of comment tags to place caret in right location
        console.log(this.getAbsoluteLocation(time) + (this.canvas.offsetLeft - 67));
        return this.getAbsoluteLocation(time) + (this.canvas.offsetLeft - 67);
    }

    getAbsoluteLocation(time) {
        return (time / (this.duration * 1000)) * (this.canvas.width - 24) + 12;
    }

    getRelativeLocation(location) {
        return location - this.canvas.offsetLeft + 67;
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
