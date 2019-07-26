import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../Model/question';

@Component({
    selector: 'app-multiple-select',
    templateUrl: './multiple-select.component.html',
    styleUrls: ['./multiple-select.component.css']
})
export class MultipleSelectComponent implements OnInit {


    @Input() question: Question;

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
        const input = this.workingCopy.split('@@');
        if (event === '') {
            input.splice(index, 1);
            this.workingCopy = input.join('@@');
        } else {
            input[index] = event;
        }
        this.question.custom_properties.options = input.join('@@');


    }

    newLine(index) {
        const input = this.workingCopy.split('@@');

        input.splice(index + 1, 0, '');
        this.workingCopy = input.join('@@');

        this.question.custom_properties.options = input.join('@@');
    }

    delete(content, index) {
        console.log(content);
        const input = this.workingCopy.split('@@');
        if (content === '') {
            input.splice(index, 1);
            this.workingCopy = input.join('@@');
        }
        this.question.custom_properties.options = input.join('@@');
    }

}
