import {Component, OnInit} from '@angular/core';
import {LessonPageBuilderService} from './lesson-page-builder.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Question} from '../../../Model/question';
import {MatDialog} from '@angular/material';
import {RubricGradingDialogComponent} from '../../../dialogs/rubric-grading-dialog';

@Component({
    selector: 'app-lesson-page-builder',
    templateUrl: './lesson-page-builder.component.html',
    styleUrls: ['./lesson-page-builder.component.scss']
})
export class LessonPageBuilderComponent implements OnInit {

    // UI CONTROL OBJECTS

    sidebar_open = false;
    sidebar_question: Question;

    explainerContentDisplayed = false;

    currentQuestion = -1;

    addQuestionDialogShown = false;

    questionTypeList = Question.questionTypeList();

    // DATA OBJECTS
    lesson$ = this.lessonBuilderService.editingLessonPage;

    preview_hidden = true;

    selectedTextQuestion = -1;
    selectionShown = false;




    constructor(private lessonBuilderService: LessonPageBuilderService,
                private router: Router,
                private route: ActivatedRoute,
                private dialog: MatDialog) {

    }


    openGradingPopup() {

        const dialogRef = this.dialog.open(RubricGradingDialogComponent, {
            height: '400px',
            width: '600px',
            data: {
                page: this.lessonBuilderService.editingLessonPageSubject.value
            }
        });

        dialogRef.afterClosed().subscribe(value => {
            // Closed.
        });


    }

    togglePreview() {
        this.preview_hidden = !this.preview_hidden;
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

    text_selection(event) {
       this.selectedTextQuestion = event.id;
       this.selectionShown = event.shown;
    }


    deleteQuestion(event) {
        this.lessonBuilderService.deleteQuestion(event);
    }

}
