import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {LessonPage} from '../../Model/lesson-page';
import {AuthenticatedHttpClient} from '../../services/authenticated-http-service.service';
import {Submission} from '../../Model/submission';
import {Lesson} from '../../Model/lesson';
import {map, publishReplay, refCount, tap} from 'rxjs/operators';
import {LessonPageBuilderService} from '../../../faculty/lessonPage/lesson-page-builder/lesson-page-builder.service';
import {AnswerChangedEvent} from '../../Events/answer-changed-event';
import {SubmissionResponse} from '../../Model/submissionResponse';

@Injectable({
    providedIn: 'root'
})
export class SubmissionService {


    submissionSubject: BehaviorSubject<Submission> = new BehaviorSubject<Submission>(new Submission());
    submission = this.submissionSubject.asObservable();


    allSubmissionsSubject: BehaviorSubject<Submission[]> = new BehaviorSubject<Submission[]>([]);
    allSubmissions = this.allSubmissionsSubject.asObservable();

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



    async loadAllSubmissions() {
        const promise = await this.http.get<Submission[]>(AuthenticatedHttpClient.SUBMISSION_URL);

        promise.subscribe(async submissions => {
            this.allSubmissionsSubject.next(submissions);
        });
    }



    async save(submission, callback?) {

        const promise = await this.http.put<Submission>(AuthenticatedHttpClient.SUBMISSION_URL + '/' + submission.id, submission);

        promise.subscribe(submissionResp => {
            this.submissionSubject.next(submissionResp);
            if (callback != null ) {
                callback();
            }
        });


    }


    async submitSubmission(submission, callback?) {
        const promise = await this.http.post<Submission>(AuthenticatedHttpClient.SUBMISSION_URL + '/complete', submission);

        promise.subscribe(submissionResp => {
            this.submissionSubject.next(submissionResp);
            if (callback != null ) {
                callback();
            }
        });

    }


    async processChangesForQuestion(event: AnswerChangedEvent) {
        let responseIndex: string;
        const submission = this.submissionSubject.value;
        for (const i in submission.responses) {
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
