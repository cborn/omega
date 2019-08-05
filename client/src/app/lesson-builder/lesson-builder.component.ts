import {Component, OnInit} from '@angular/core';
import {LessonBuilderService} from './lesson-builder.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Question} from '../Model/question';
import {PERMISSION_ROLE, SessionManagerService} from '../session-manager.service';

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

    addQuestionDialogShown = false;

    questionTypeList = Question.questionTypeList();




    // DATA OBJECTS
    lesson$ = this.lessonBuilderService.editingLessonPage;


    constructor(private lessonBuilderService: LessonBuilderService, private router: Router, private route: ActivatedRoute, private sessionManager: SessionManagerService) {

    }

    ngOnInit() {


        if (!this.sessionManager.checkRoles(PERMISSION_ROLE.ROLE_FACULTY)) {
            this.router.navigate(['/unauthorized']);
        }

        this.route.paramMap.subscribe(value => {
            this.lessonBuilderService.getLessonToEdit(value.get('lessonId'));
        });


    }

    addNewQuestion() {
        this.addQuestionDialogShown = !this.addQuestionDialogShown;

    }

    addNewQuestionWithType(type) {
        this.addQuestionDialogShown = false;
        this.lessonBuilderService.addNewQuestion(type.value);
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
