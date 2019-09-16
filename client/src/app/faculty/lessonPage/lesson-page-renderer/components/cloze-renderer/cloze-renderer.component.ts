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
    }

    @HostListener('window:clozeInputChanged', ['$event'])
    onInputChanged(event) {

        console.log(event.detail);
        console.log(this.response);

        if (this.response.id === event.detail.responseId) {
            const split = this.response.response.split('@@');
            split[event.detail.promptIndex] = event.detail.value;
            this.answerDidChange(this.question, split.join('@@'));

        }


    }

    setValue(value) {
        this.value = value;
    }

}
