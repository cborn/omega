import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../../../../Model/question';
import {Subject} from 'rxjs/internal/Subject';
import {pipe} from 'rxjs/internal-compatibility';
import {debounce, debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
    selector: 'app-multiple-select',
    templateUrl: './multiple-select.component.html',
    styleUrls: ['./multiple-select.component.css']
})
export class MultipleSelectComponent implements OnInit {


    @Input() question: Question;

    @Output() questionChanged = new EventEmitter();

    questionChangedSubject = new Subject<string>();

    changedIndex = -1;

    workingCopy = [];

    constructor() {
    }

    ngOnInit() {

        if (this.question.custom_properties.options === undefined) {
            this.question.custom_properties.options = '';
        }

        this.question.custom_properties.options.split('@@').forEach(item => {
            this.workingCopy.push({value: item});
        });

        this.questionChangedSubject.pipe(debounceTime(1000)).pipe(distinctUntilChanged()).subscribe(value => {
            this.questionChanged.emit(true);
        });
    }

    itsChanged(event, index) {
        this.triggerSave();
    }

    newLine(index) {
        this.workingCopy.splice(index + 1, 0, {value: 'Option' + (this.workingCopy.length + 1)});
        // we need to move the cursor to the line below.
        this.triggerSave();
    }

    delete(content, index) {
        if (content.value === '') {
            this.workingCopy.splice(index, 1);
            // We need to move the cursor to the line above .
        }

        this.triggerSave();
    }


    triggerSave() {
        this.question.custom_properties.options = this.workingCopy.map(item => {
            return item.value;
        }).join('@@');


        this.questionChangedSubject.next(this.question.custom_properties.options);


    }

}
