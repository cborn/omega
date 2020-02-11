import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../../Model/question';
import {BaseRenderComponent} from '../../../../../Blueprints/base-render-component';
import {LessonPageBuilderService} from '../../../lesson-page-builder/lesson-page-builder.service';

@Component({
    selector: 'app-multi-choice-renderer',
    templateUrl: './multi-choice-renderer.component.html',
    styleUrls: ['./multi-choice-renderer.component.css']
})
export class MultiChoiceRendererComponent extends BaseRenderComponent implements OnInit {


    value;

    options = [];

    constructor() {
        super();
    }

    ngOnInit() {

        if (this.question.custom_properties.random) {
            this.options = this.question.custom_properties.options.split('@@').sort((a, b) => {
                const aChar = Math.random();
                const bChar = Math.random();
                return aChar - bChar;
            });
        } else {
            this.options = this.question.custom_properties.options.split('@@');
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
