import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../Model/question';
import {BaseRenderComponent} from '../../../../Blueprints/base-render-component';

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

    isDropdown(index) {

        const prompts = JSON.parse(this.question.custom_properties.cloze_prompts)[index];

        if (prompts === undefined) {
            return 'NO_INPUT';
        }

        return prompts.length > 0;


    }

    setValue(value) {
        this.value = value;
    }

}
