import {Injectable} from '@angular/core';
import {AuthenticatedHttpClient} from '../../services/authenticated-http-service.service';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {LessonPage} from '../../Model/lesson-page';
import {Course} from '../../Model/course';
import {BaseService} from '../../Blueprints/base-service';

@Injectable({
    providedIn: 'root'
})
export class CourseService extends BaseService<Course> {

    constructor(private http: AuthenticatedHttpClient) {
        super(http, AuthenticatedHttpClient.COURSE_URL, true);
    }

    getClassName() {
        return 'Course';
    }

}
