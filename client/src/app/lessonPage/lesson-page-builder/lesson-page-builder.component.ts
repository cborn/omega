import {Component, OnInit} from '@angular/core';
import {LessonPageBuilderService} from './lesson-page-builder.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Question} from '../../Model/question';

@Component({
    selector: 'app-lesson-page-builder',
    templateUrl: './lesson-page-builder.component.html',
    styleUrls: ['./lesson-page-builder.component.scss']
})
export class LessonPageBuilderComponent implements OnInit {

    // UI CONTROL OBJECTS

    sidebar_open = false;
    sidebar_question: Question;

    currentQuestion = -1;

    addQuestionDialogShown = false;

    questionTypeList = Question.questionTypeList();

    // DATA OBJECTS
    lesson$ = this.lessonBuilderService.editingLessonPage;


    constructor(private lessonBuilderService: LessonPageBuilderService, private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit() {

        this.route.paramMap.subscribe(value => {
            this.lessonBuilderService.getLessonToEdit(value.get('lessonId'));
        });

        this.lesson$.subscribe(value => {
            // if the lesson has changed and the sidebar is open then we need to re link the sidebar question...

            if (this.sidebar_open) {
                for (const i in value.questions) {
                    if (value.questions[i].id === this.sidebar_question.id) {
                        this.sidebar_question = value.questions[i];
                    }
                }
            }

        });


    }

    addNewQuestion() {
        this.addQuestionDialogShown = !this.addQuestionDialogShown;

    }

    addNewQuestionWithType(type) {
        this.addQuestionDialogShown = false;
        this.lessonBuilderService.addNewQuestion(type.value);
    }

    changed() {
        this.lessonBuilderService.isDirtySubject.next(true);
    }


    openSidebar(question) {


        this.sidebar_question = question;
        this.sidebar_open = true;

    }

    closeSidebar() {
        this.sidebar_question = null;
        this.sidebar_open = false;

    }


    deleteQuestion(event) {
        this.lessonBuilderService.deleteQuestion(event);
    }

}
