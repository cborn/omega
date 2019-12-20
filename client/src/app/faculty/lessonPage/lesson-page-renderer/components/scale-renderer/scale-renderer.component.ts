import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Question} from '../../../../../Model/question';
import {BaseRenderComponent} from '../../../../../Blueprints/base-render-component';

@Component({
    selector: 'app-scale-renderer',
    templateUrl: './scale-renderer.component.html',
    styleUrls: ['./scale-renderer.component.css']
})
export class ScaleRendererComponent extends BaseRenderComponent implements OnInit, OnDestroy {


    MAX_ITEMS = 20;

    value;

    oldinput = {};


    inputs = [];

    count = 0;

    interval;

    constructor() {
        super();
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

        this.count = Math.round((parseInt(this.question.custom_properties.end) - parseInt(this.question.custom_properties.start)) / parseInt(this.question.custom_properties.step));


        this.oldinput = Object.assign({}, this.question.custom_properties);

        if (parseInt(this.question.custom_properties.step) > 0 &&  this.count <= this.MAX_ITEMS) {
            for (let i = parseInt(this.question.custom_properties.start); i <= parseInt(this.question.custom_properties.end); i += parseInt(this.question.custom_properties.step)) {
                this.inputs.push(i);
            }
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


            if (x.question.custom_properties.start === undefined) {
                x.question.custom_properties.start = 0;
            }

            if (x.question.custom_properties.end === undefined) {
                x.question.custom_properties.end = 10;
            }


            if (x.question.custom_properties.step === undefined) {
                x.question.custom_properties.step = 1;
            }

            x.count = Math.round((parseInt(x.question.custom_properties.end) - parseInt(x.question.custom_properties.start)) / parseInt(x.question.custom_properties.step));

            if (parseInt(x.question.custom_properties.step) > 0 &&  x.count < x.MAX_ITEMS) {
                for (let i = parseInt(x.question.custom_properties.start); i <= parseInt(x.question.custom_properties.end); i += parseInt(x.question.custom_properties.step)) {
                    x.inputs.push(i);
                }
            }
        }
    }


    didSelect(value) {
        this.value = value;
        this.answerDidChange(this.question, this.value);
    }

    setValue(value) {
        this.value = value;
    }

}
