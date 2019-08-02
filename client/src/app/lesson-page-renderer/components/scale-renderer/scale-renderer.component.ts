import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Question} from '../../../Model/question';

@Component({
    selector: 'app-scale-renderer',
    templateUrl: './scale-renderer.component.html',
    styleUrls: ['./scale-renderer.component.css']
})
export class ScaleRendererComponent implements OnInit, OnDestroy {


    @Input() question: Question;
    value;

    oldinput = {};


    inputs = [];

    interval;

    constructor() {
    }

    ngOnInit() {

        this.inputs = [];

        if (this.question.custom_properties.start === undefined) {
            this.question.custom_properties.start = 0;
        }

        if (this.question.custom_properties.end === undefined) {
            this.question.custom_properties.end = 10;
        }


        if (this.question.custom_properties.step === undefined) {
            this.question.custom_properties.step = 1;
        }

        this.oldinput = Object.assign({}, this.question.custom_properties);


        for (let i = this.question.custom_properties.start; i <= this.question.custom_properties.end; i += this.question.custom_properties.step) {
            this.inputs.push(i);
        }

        this.interval = setInterval(this.changes, 2000, this);

    }

    ngOnDestroy(): void {

        clearInterval(this.interval);

    }


    changes(x) {

        if (x.oldinput.start !== x.question.custom_properties.start || x.oldinput.end !== x.question.custom_properties.end || x.oldinput.step !== x.question.custom_properties.step) {
            x.oldinput = Object.assign({}, x.question.custom_properties);
            x.inputs = [];
            for (let i = x.question.custom_properties.start; i <= x.question.custom_properties.end; i += x.question.custom_properties.step) {
                x.inputs.push(i);
            }
        }
    }


    didSelect(value) {
        this.value = value;
    }

}
