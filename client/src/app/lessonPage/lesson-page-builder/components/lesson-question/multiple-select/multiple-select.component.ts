import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../../Model/question';

@Component({
    selector: 'app-multiple-select',
    templateUrl: './multiple-select.component.html',
    styleUrls: ['./multiple-select.component.css']
})
export class MultipleSelectComponent implements OnInit {


    @Input() question: Question;

    changedIndex = -1;

    workingCopy;

    constructor() {
    }

    ngOnInit() {

        if (this.question.custom_properties.options === undefined) {
            this.question.custom_properties.options = '';
        }

        this.workingCopy = this.question.custom_properties.options;


    }

    itsChanged(event, index) {
        const input = this.question.custom_properties.options.split('@@');
        if (event === '') {
            input.splice(index, 1);
            this.question.custom_properties.options = input.join('@@');
        } else {
            input[index] = event;
        }
        this.question.custom_properties.options = input.join('@@');
        // this.workingCopy = input.join('@@');


    }

    newLine(index) {
        const input = this.question.custom_properties.options.split('@@');

        input.splice(index + 1, 0, '');
        this.workingCopy = input.join('@@');

        this.question.custom_properties.options = input.join('@@');
    }

    delete(content, index) {
        const input = this.question.custom_properties.options.split('@@');
        if (content === '') {
            input.splice(index, 1);
            this.question.custom_properties.options = input.join('@@');
        }
        this.question.custom_properties.options = input.join('@@');
        this.workingCopy = input.join('@@');
    }
}
