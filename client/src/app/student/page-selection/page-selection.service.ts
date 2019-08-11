import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {LessonPage} from '../../Model/lesson-page';
import {AuthenticatedHttpClient} from '../../services/authenticated-http-service.service';
import {Submission} from '../../Model/submission';

@Injectable({
    providedIn: 'root'
})
export class PageSelectionService {

    pagesSubject: BehaviorSubject<LessonPage[]> = new BehaviorSubject<LessonPage[]>([]);
    pages = this.pagesSubject.asObservable();

    constructor(private http: AuthenticatedHttpClient) {
    }


    async loadData(lessonId) {
        const promise = await this.http.get<LessonPage[]>(AuthenticatedHttpClient.LESSON_PAGE_URL + '?lessonId=' + lessonId);

        promise.subscribe(async pages => {

            await pages.forEach(async page => {
                const submissionPromise = await this.http.get<Submission[]>(AuthenticatedHttpClient.SUBMISSION_URL + '?lessonPageId=' + page.id);
                submissionPromise.subscribe(submissions => {
                    page.submissions = (submissions);
                });
            });

            this.pagesSubject.next(pages);


        });


    }


    async addNewSubmission(page, callback?) {

        const promise = await this.http.post<Submission>(AuthenticatedHttpClient.SUBMISSION_URL, {
            page: page.id
        });

        promise.subscribe(submission => {
            if (callback) {
                callback(submission);
            }

        });

    }


}
