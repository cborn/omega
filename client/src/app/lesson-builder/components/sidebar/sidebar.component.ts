import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question, QuestionType} from '../../../Model/question';

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


    constructor() {
    }

    ngOnInit() {
    }

    closeSidebarAction() {
        this.closeSidebar.emit(true);
    }

    isOfType(options: QuestionType[]) {

        if (options.indexOf(this.question.type) > -1) {
            return true;
        }
        return false;


    }
}
