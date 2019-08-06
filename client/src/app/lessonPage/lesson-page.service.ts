import {Injectable} from '@angular/core';
import {BaseService} from '../Blueprints/base-service';
import {LessonPage} from '../Model/lesson-page';
import {AuthenticatedHttpClient} from '../authenticated-http-service.service';

@Injectable({
    providedIn: 'root'
})
export class LessonPageService extends BaseService<LessonPage> {

    constructor(private http: AuthenticatedHttpClient) {
        super(http, AuthenticatedHttpClient.LESSON_PAGE_URL);
    }
}
