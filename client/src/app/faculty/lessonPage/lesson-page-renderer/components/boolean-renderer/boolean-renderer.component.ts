import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BaseRenderComponent} from '../../../../../Blueprints/base-render-component';

@Component({
    selector: 'app-boolean-renderer',
    templateUrl: './boolean-renderer.component.html',
    styleUrls: ['./boolean-renderer.component.css']
})
export class BooleanRendererComponent extends BaseRenderComponent implements OnInit {


    value: boolean;

    constructor() {
        super();
    }

    ngOnInit() {
    }


    didSelect(value) {
        this.value = value;
        this.answerDidChange(this.question, this.value);
    }

    setValue(value) {
        this.value = value === 'true';
    }


}
