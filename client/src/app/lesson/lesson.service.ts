import {Injectable} from '@angular/core';
import {AuthenticatedHttpClient} from '../services/authenticated-http-service.service';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {LessonPage} from '../Model/lesson-page';
import {Lesson} from '../Model/lesson';
import {BaseService} from '../Blueprints/base-service';

@Injectable({
    providedIn: 'root'
})
export class LessonService extends BaseService<Lesson> {

    constructor(private http: AuthenticatedHttpClient) {
        super(http, AuthenticatedHttpClient.LESSON_URL);
    }
}
