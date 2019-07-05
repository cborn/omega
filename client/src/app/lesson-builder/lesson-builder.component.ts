import {Component, OnInit} from '@angular/core';
import {LessonBuilderService} from './lesson-builder.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonPage} from '../Model/lesson-page';
import {Question, QuestionType} from '../Model/question';

@Component({
    selector: 'app-lesson-builder',
    templateUrl: './lesson-builder.component.html',
    styleUrls: ['./lesson-builder.component.scss']
})
export class LessonBuilderComponent implements OnInit {

    // UI CONTROL OBJECTS

    sidebar_open = false;
    sidebar_question: Question;

    currentQuestion = -1;


    // DATA OBJECTS
    lesson: LessonPage;


    constructor(private lessonBuilderService: LessonBuilderService, private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit() {


        this.route.paramMap.subscribe(value => {
            this.lessonBuilderService.getLessonToEdit(value.get('lessonId')).subscribe(value2 => {
                this.lesson = value2;
            });
        });


    }


    openSidebar(question) {


        this.sidebar_question = question;
        this.sidebar_open = true;

    }

    closeSidebar() {
        this.sidebar_question = null;
        this.sidebar_open = false;

    }

}
