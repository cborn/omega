import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AuthenticatedHttpClient} from '../../../../../../services/authenticated-http-service.service';

@Component({
    selector: 'app-pitch-render',
    templateUrl: './pitch-render.component.html',
    styleUrls: ['./pitch-render.component.css']
})
export class PitchRenderComponent implements OnInit, OnChanges {

    private canvasContext: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;

    loading = false;

    @Input() recordingId: string;
    @Input() duration: number;


    private audioAnalysis: any;

    constructor(private http: AuthenticatedHttpClient) {
    }

    ngOnInit() {


        // this.loadData();

    }


    async loadData() {
        const promise = await this.http.get(AuthenticatedHttpClient.GET_PITCH + '?key=' + this.recordingId);

        promise.subscribe(data => {
            this.audioAnalysis = data;
            this.graphPitchAnnotations(this, this.audioAnalysis, this.duration, 'canvas_pitch_' + this.recordingId);
        });
    }


    graphPitchAnnotations(context, data, duration, canvasId) {


        context.canvas = document.getElementById(canvasId);

        let maxPitch = 0;
        for (let i = 0; i < data.praatPitchAnnotations.length; i++) {
            const pi = data.praatPitchAnnotations[i];
            for (let j = 0; j < pi.pitchAnnotations.length; j++) {
                if (pi.pitchAnnotations[j].pitch > maxPitch) {
                    maxPitch = pi.pitchAnnotations[j].pitch;
                }
            }
        }

        const heightStep = .8 * (context.canvas.height) / maxPitch;
        context.canvasContext = context.canvas.getContext('2d');
        context.canvasContext.clearRect(0, 0, context.canvas.width, context.canvas.height);

        context.canvasContext.strokeStyle = '#42eef4';
        context.canvasContext.lineWidth = 1.4;

        for (let i = 0; i < data.praatPitchAnnotations.length; i++) {

            const pi = data.praatPitchAnnotations[i];
            const pitchAnnotations = pi.pitchAnnotations.sort((a, b) => {
                return a.start - b.start;
            });
            context.canvasContext.beginPath();

            const start = pitchAnnotations[0].start;
            const pitch = pitchAnnotations[0].pitch;
            const x = context.canvas.width * (start / duration);
            const y = context.canvas.height - (pitch * heightStep);
            context.canvasContext.moveTo(x, y);

            for (let j = 0; j < pitchAnnotations.length; j++) {

                const start2 = pitchAnnotations[j].start;
                const pitch2 = pitchAnnotations[j].pitch;
                const x2 = Math.round(context.canvas.width * (start2 / duration));
                const y2 = Math.round(context.canvas.height - (pitch2 * heightStep));
                context.canvasContext.lineTo(x2, y2);
            }
            context.canvasContext.stroke();
        }
        console.log('Drew pitch annotations.');
    };

    ngOnChanges(changes: SimpleChanges): void {

        this.loadData();
    }


}
