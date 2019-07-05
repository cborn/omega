import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../environments/environment';
import {map, publishReplay, refCount} from 'rxjs/operators';
import {LessonPage} from '../Model/lesson-page';
import {of} from 'rxjs/internal/observable/of';
import {Question, QuestionType} from '../Model/question';

@Injectable({
  providedIn: 'root'
})
export class LessonBuilderService {


  editingLessonPage: Observable<any>;

  constructor(private httpClient: HttpClient) { }

  getLessonToEdit(lessonPageId): Observable<LessonPage> {
    if (!this.editingLessonPage) {
      this.editingLessonPage = this.httpClient.get(environment.serverUrl + 'lessonPage/' + lessonPageId).pipe(map(value => {

        const modifiedQuestions = Object.assign({}, value);

       for(const q in modifiedQuestions['questions']) {
         if (modifiedQuestions['questions'].hasOwnProperty(q)) {
           const question: Question = modifiedQuestions['questions'][q];
           question.type = Question.getTypeForString(question.type);
         }
       }


        return modifiedQuestions;

      }))
          .pipe(publishReplay()).pipe(refCount());
    }
    return this.editingLessonPage;
  }
}
