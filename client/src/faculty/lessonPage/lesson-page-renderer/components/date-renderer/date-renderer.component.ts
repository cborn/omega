import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../../app/Model/question';
import {BaseRenderComponent} from '../../../../../app/Blueprints/base-render-component';



@Component({
    selector: 'app-date-renderer',
    templateUrl: './date-renderer.component.html',
    styleUrls: ['./date-renderer.component.css'],
})
export class DateRendererComponent extends BaseRenderComponent implements OnInit {

    @Input() question: Question;

    value: string;

    constructor() {
        super();
    }

    ngOnInit() {
    }


    setValue(value) {
        this.value = value;
    }
}
