import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../environments/environment';
import {map, publishReplay, refCount, tap} from 'rxjs/operators';
import {LessonPage} from '../Model/lesson-page';
import {of} from 'rxjs/internal/observable/of';
import {Question, QuestionType} from '../Model/question';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root'
})
export class LessonBuilderService {


    editingLessonPageSubject: BehaviorSubject<LessonPage> = new BehaviorSubject<LessonPage>(new LessonPage());
    editingLessonPage = this.editingLessonPageSubject.asObservable();

    constructor(private httpClient: HttpClient) {
    }

    getLessonToEdit(lessonPageId) {
        this.httpClient.get(environment.serverUrl + 'lessonPage/' + lessonPageId).pipe(map(value => {

            const modifiedQuestions = Object.assign({}, value);

            for (const q in modifiedQuestions['questions']) {
                if (modifiedQuestions['questions'].hasOwnProperty(q)) {
                    const question: Question = modifiedQuestions['questions'][q];
                    question.type = Question.getTypeForString(question.type);
                    if (question.custom_properties === undefined) {
                        question.custom_properties = {};
                    }
                }
            }

            return modifiedQuestions;

        })).pipe(tap(x => {
            this.editingLessonPageSubject.next(x as LessonPage);
        })).pipe(publishReplay()).pipe(refCount()).subscribe();

    }


    deleteQuestion(question) {
        const lessonPage = this.editingLessonPageSubject.value;

        let ind = -1;
        const res = lessonPage.questions.find((value, index) => {
            if (value.id === question.id) {
                ind = index;
                return true;
            }
        });

        if (ind > -1) {
            lessonPage.questions.splice(ind, 1);
        }

    }

    addNewQuestion(type) {

        const lessonPage = this.editingLessonPageSubject.value;

        lessonPage.questions.push(new Question(type, lessonPage.questions.length));

    }
}
