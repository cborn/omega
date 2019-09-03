import {Injectable} from '@angular/core';
import {AuthenticatedHttpClient} from '../../app/services/authenticated-http-service.service';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {LessonPage} from '../../app/Model/lesson-page';
import {Lesson} from '../../app/Model/lesson';
import {BaseService} from '../../app/Blueprints/base-service';

@Injectable({
    providedIn: 'root'
})
export class LessonService extends BaseService<Lesson> {

    constructor(private http: AuthenticatedHttpClient) {
        super(http, AuthenticatedHttpClient.LESSON_URL);
    }
}
