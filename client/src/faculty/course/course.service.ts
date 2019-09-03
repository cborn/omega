import {Injectable} from '@angular/core';
import {AuthenticatedHttpClient} from '../../app/services/authenticated-http-service.service';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {LessonPage} from '../../app/Model/lesson-page';
import {Course} from '../../app/Model/course';
import {BaseService} from '../../app/Blueprints/base-service';

@Injectable({
    providedIn: 'root'
})
export class CourseService extends BaseService<Course> {

    constructor(private http: AuthenticatedHttpClient) {
        super(http, AuthenticatedHttpClient.COURSE_URL);
    }


}
