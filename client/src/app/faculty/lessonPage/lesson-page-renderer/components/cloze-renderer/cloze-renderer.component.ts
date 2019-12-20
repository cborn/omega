import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Question} from '../../../../../Model/question';
import {BaseRenderComponent} from '../../../../../Blueprints/base-render-component';

@Component({
    selector: 'app-cloze-renderer',
    templateUrl: './cloze-renderer.component.html',
    styleUrls: ['./cloze-renderer.component.css']
})
export class ClozeRendererComponent extends BaseRenderComponent implements OnInit {

    JSON = JSON;

    value;


    constructor() {
        super();
    }

    ngOnInit() {
        console.log(this.response);
        if (this.response === undefined) {
            this.answerDidChange(this.question, '');
        }

    }

    @HostListener('window:clozeInputChanged', ['$event'])
    onInputChanged(event) {

        if (this.response.id === event.detail.responseId) {

            if(this.response.response == null) {
                this.response.response = '';
            }
            const split = this.response.response.split('@@');
            split[event.detail.promptIndex] = event.detail.value;
            this.answerDidChange(this.question, split.join('@@'));

        }


    }

    setValue(value) {
        this.value = value;
    }

}
