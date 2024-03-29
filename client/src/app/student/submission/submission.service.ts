import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {LessonPage} from '../../Model/lesson-page';
import {AuthenticatedHttpClient} from '../../services/authenticated-http-service.service';
import {Submission} from '../../Model/submission';
import {Lesson} from '../../Model/lesson';
import {map, publishReplay, refCount, tap} from 'rxjs/operators';
import {LessonPageBuilderService} from '../../faculty/lessonPage/lesson-page-builder/lesson-page-builder.service';
import {AnswerChangedEvent} from '../../Events/answer-changed-event';
import {SubmissionResponse} from '../../Model/submissionResponse';
import {Question} from '../../Model/question';

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

    async markSubmissionAsSeen(submissionId) {
        const promise = await this.http.post<Submission>(AuthenticatedHttpClient.SUBMISSION_SEEN_URL + '/' + submissionId, null);

        promise.subscribe(() => {
        });
    }


    async loadAllSubmissions(lessonId?) {
        const promise = await this.http.get<Submission[]>(AuthenticatedHttpClient.SUBMISSION_URL + (lessonId ? '?lessonId=' + lessonId : ''));

        promise.subscribe(async submissions => {
            this.allSubmissionsSubject.next(submissions);

        });

        return promise;
    }


    async save(submission, callback?) {

        const promise = await this.http.put<Submission>(AuthenticatedHttpClient.SUBMISSION_URL + '/' + submission.id, submission);

        promise.subscribe(submissionResp => {
            this.submissionSubject.next(submissionResp);
            if (callback != null) {
                callback();
            }
        });


    }


    async grade(submission, callback?) {
        const promise = await this.http.post<Submission>(AuthenticatedHttpClient.SUBMISSION_GRADE_URL + '/' + submission.id, submission);

        promise.subscribe(submissionResp => {
            this.submissionSubject.next(submissionResp);
            if (callback != null) {
                callback();
            }
        });
    }


    async submitSubmission(submission, callback?) {
        const promise = await this.http.post<Submission>(AuthenticatedHttpClient.SUBMISSION_URL + '/complete', submission);

        promise.subscribe(submissionResp => {
            this.submissionSubject.next(submissionResp);
            if (callback != null) {
                callback();
            }
        }, error1 => {
            if (callback != null) {
                callback(error1);
            }
        });

    }

    async softUpdate(event: AnswerChangedEvent) {
        const submission = this.submissionSubject.value;
        if(event.shouldReloadFromWeb) {
            this.loadData(submission.id);
        }
        else {
            let responseIndex: string;
            for (const i in submission.responses) {
                if (submission.responses.hasOwnProperty(i)) {
                    if (submission.responses[i].question.id === event.question.id) {
                        responseIndex = i;
                    }
                }
            }

            if (responseIndex) {
                submission.responses[responseIndex].response = event.value;
                console.log(submission.responses[responseIndex].response);
                this.submissionSubject.next(submission);
            }



        }





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
            response.question = event.question;


            response.response = event.value;
            submission.responses.push(response);

        } else {
            if (submission.responses[responseIndex].status === 'COMMENTS_PENDING') {
                submission.responses[responseIndex].status  = 'COMMENTS_RESPONDED';
            }
            submission.responses[responseIndex].response = event.value;
        }



        if(event.shouldReloadFromWeb) {

            submission.responses.forEach(value => {
                for (const customPropertiesKey in value.question.custom_properties) {
                    if (value.question.custom_properties.hasOwnProperty(customPropertiesKey)) {
                        value.question.custom_properties[customPropertiesKey] = value.question.custom_properties[customPropertiesKey] + '';
                    }

                }

            });


            this.save(submission);
        }

    }


}
