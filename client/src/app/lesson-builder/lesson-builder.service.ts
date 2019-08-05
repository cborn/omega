import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../environments/environment';
import {map, publishReplay, refCount, tap} from 'rxjs/operators';
import {LessonPage} from '../Model/lesson-page';
import {of} from 'rxjs/internal/observable/of';
import {Question, QuestionType} from '../Model/question';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

const BOOLEAN_PROPERTIES = ['stack', 'random'];

@Injectable({
    providedIn: 'root'
})
export class LessonBuilderService {


    editingLessonPageSubject: BehaviorSubject<LessonPage> = new BehaviorSubject<LessonPage>(new LessonPage());
    editingLessonPage = this.editingLessonPageSubject.asObservable();

    constructor(private httpClient: HttpClient) {
    }


    filterFromServer(value) {
        // console.log(value);
        const modifiedLessonPage = Object.assign({}, value);

        for (const q in modifiedLessonPage['questions']) {
            if (modifiedLessonPage['questions'].hasOwnProperty(q)) {

                const question: Question = modifiedLessonPage['questions'][q];

                question.type = Question.getTypeForString(question.type);

                if (question.custom_properties === undefined) {
                    question.custom_properties = {};
                }

                for (const customPropertiesKey in question.custom_properties) {

                    if (question.custom_properties.hasOwnProperty(customPropertiesKey)) {
                        if (BOOLEAN_PROPERTIES.indexOf(customPropertiesKey) > -1) {
                            console.log('changing - ' + customPropertiesKey);
                            question.custom_properties[customPropertiesKey] = (question.custom_properties[customPropertiesKey] === 'true');
                        }
                    }

                }
            }
        }


//         console.log(modifiedLessonPage);
        return modifiedLessonPage;
    }

    getLessonToEdit(lessonPageId) {
        this.httpClient.get(environment.BASE_URL + 'lessonPage/' + lessonPageId).pipe(map(this.filterFromServer)).pipe(tap(x => {
            this.editingLessonPageSubject.next(x as LessonPage);
        })).pipe(publishReplay()).pipe(refCount()).subscribe();

    }

    addImageToQuestion(question, image): Observable<Question> {

        const uploadData = new FormData();
        uploadData.append('image', image, 'IGNORED');
        return this.httpClient.post(environment.BASE_URL + 'question/addImage/' + question.id, uploadData) as Observable<Question>;

    }

    removeImageToQuestion(question, imageToRemove) {
        return this.httpClient.delete(environment.BASE_URL + 'question/removeImage/' + question.id + '?image=' + imageToRemove) as Observable<Question>;
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

        this.httpClient.delete(environment.BASE_URL + 'question/' + question.id).subscribe(value => {
            this.sync();
        });


    }

    addNewQuestion(type) {

        const lessonPage = this.editingLessonPageSubject.value;

        lessonPage.questions.push(new Question(type, lessonPage.questions.length));

        this.sync();


    }


    sync() {
        const lessonPage = Object.assign({}, this.editingLessonPageSubject.value);

        lessonPage.questions.forEach(value => {

            for (const customPropertiesKey in value.custom_properties) {
                if (value.custom_properties.hasOwnProperty(customPropertiesKey)) {
                    value.custom_properties[customPropertiesKey] = value.custom_properties[customPropertiesKey] + '';
                }

            }

        });


        this.httpClient.put(environment.BASE_URL + 'lessonPage/' + lessonPage.id, lessonPage).pipe(map(this.filterFromServer)).pipe(tap(x => {
            console.log(x.questions[2].custom_properties.random);
            this.editingLessonPageSubject.next(x as LessonPage);
        })).pipe(publishReplay()).pipe(refCount()).subscribe();
    }
}
