import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {LessonPage} from '../../Model/lesson-page';
import {AuthenticatedHttpClient} from '../../services/authenticated-http-service.service';
import {Submission} from '../../Model/submission';
import {Lesson} from '../../Model/lesson';
import {map, publishReplay, refCount, tap} from 'rxjs/operators';
import {LessonPageBuilderService} from '../../lessonPage/lesson-page-builder/lesson-page-builder.service';
import {AnswerChangedEvent} from '../../Events/answer-changed-event';
import {SubmissionResponse} from '../../Model/submissionResponse';

@Injectable({
    providedIn: 'root'
})
export class SubmissionService {


    submissionSubject: BehaviorSubject<Submission> = new BehaviorSubject<Submission>(new Submission());
    submission = this.submissionSubject.asObservable();

    pageSubject: BehaviorSubject<LessonPage> = new BehaviorSubject<LessonPage>(new LessonPage());
    page = this.pageSubject.asObservable();


    constructor(private http: AuthenticatedHttpClient) {
    }


    async loadData(submissionId) {
        const promise = await this.http.get<Submission>(AuthenticatedHttpClient.SUBMISSION_URL + '/' + submissionId);

        promise.subscribe(async submission => {

            this.submissionSubject.next(submission);
            const pagePromise = await this.http.get<LessonPage>(AuthenticatedHttpClient.LESSON_PAGE_URL + '/' + submission.page.id);

            pagePromise.pipe(map(LessonPageBuilderService.filterFromServer)).pipe(tap(x => {
                this.pageSubject.next(x as LessonPage);

            })).pipe(publishReplay()).pipe(refCount()).subscribe();


        });
    }


    async save(submission, callback?) {

        const promise = await this.http.put<Submission>(AuthenticatedHttpClient.SUBMISSION_URL + '/' + submission.id, submission);

        promise.subscribe(submissionResp => {
            console.log(submissionResp);
            this.submissionSubject.next(submissionResp);
        });


    }


    async processChangesForQuestion(event: AnswerChangedEvent) {
        let responseIndex: string;
        const submission = this.submissionSubject.value;
        for (const i in submission.responses) {
            console.log(i);
            if (submission.responses.hasOwnProperty(i)) {
                if (submission.responses[i].question.id === event.question.id) {
                    responseIndex = i;
                }
            }
        }


        if (!responseIndex) {
            const response = new SubmissionResponse();
            response.question = {
                id: event.question.id
            };

            response.response = event.value;
            submission.responses.push(response);

        } else {
            submission.responses[responseIndex].response = event.value;
        }


        this.save(submission);


    }


}
