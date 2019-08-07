import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../Model/question';

@Component({
    selector: 'app-cloze-renderer',
    templateUrl: './cloze-renderer.component.html',
    styleUrls: ['./cloze-renderer.component.css']
})
export class ClozeRendererComponent implements OnInit {

    @Input() question: Question;
    JSON = JSON;


    constructor() {
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

}
