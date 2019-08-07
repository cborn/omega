import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../Model/question';



@Component({
    selector: 'app-date-renderer',
    templateUrl: './date-renderer.component.html',
    styleUrls: ['./date-renderer.component.css'],
})
export class DateRendererComponent implements OnInit {

    @Input() question: Question;

    value: string;

    constructor() {
    }

    ngOnInit() {
    }

}
