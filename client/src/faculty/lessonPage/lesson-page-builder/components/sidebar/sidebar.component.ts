import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Question, QuestionType} from '../../../../../app/Model/question';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


    questionTypes = Question.questionTypeList();

    get QuestionType() {
        return QuestionType;
    }

    @Input() question: Question;

    @Output() closeSidebar = new EventEmitter();
    @Output() propertyChanged = new EventEmitter();



    constructor() {
    }

    ngOnInit() {
    }

    closeSidebarAction() {
        this.closeSidebar.emit(true);
    }

    isOfType(options: QuestionType[]) {
        return options.indexOf(this.question.type) > -1;

    }

    isNotOfType(options: QuestionType[]) {

        return options.indexOf(this.question.type) <= -1;

    }

    changed() {
        this.propertyChanged.emit(true);
    }

}
