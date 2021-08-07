import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AlertDialogData} from '../services/notification.service';
import {Submission} from '../Model/submission';
import {SubmissionResponse} from '../Model/submissionResponse';
import {AuthenticatedHttpClient} from '../services/authenticated-http-service.service';
import * as RecordRTC from 'recordrtc';
import {VoiceRendererComponent} from '../faculty/lessonPage/lesson-page-renderer/components/voice-renderer/voice-renderer.component';
import {Question} from '../Model/question';
import {LessonPage} from '../Model/lesson-page';
import {Lesson} from '../Model/lesson';

class Gradebook {
    id: number;
    name: string;
    grades: string[] = [];
}

@Component({
    selector: 'app-rubric-grading',
    templateUrl: 'dialog-rubric-grading-dialog.html',
})
export class RubricGradingDialogComponent {


    newGradingLabels: Gradebook;

    gradebooks: Gradebook[];
    workingCopy: [];
    createNew = false;

    gradingType;

    lessonPage: LessonPage;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { page: LessonPage }, private http: AuthenticatedHttpClient, private dialogRef: MatDialogRef<RubricGradingDialogComponent>) {
        this.gradingType = data.page.rubricGrading ? '2' : '1';
        this.lessonPage = data.page;


        this.loadGradebooks();


    }

    async loadGradebooks() {
        const promise = await this.http.get(AuthenticatedHttpClient.GRADEBOOK_URL);

        promise.subscribe(value => {
            this.gradebooks = value;
        });

    }

    createNewAction() {
        this.createNew = true;
        this.newGradingLabels = new Gradebook();
        this.workingCopy = [];
    }

    async save() {
        if (this.createNew) {
            this.saveNewGradebook();
            this.createNew = false;
        } else {
            // actually save...


            this.lessonPage.rubricGrading = this.gradingType === '2';

            const promise = await this.http.put(AuthenticatedHttpClient.LESSON_PAGE_URL + '/' + this.lessonPage.id, this.lessonPage);

            promise.subscribe(value => {
                console.log(value);
                this.dialogRef.close(value);
            });


        }
    }


    async saveNewGradebook() {
        const promise = await this.http.post<Gradebook>(AuthenticatedHttpClient.GRADEBOOK_URL, this.newGradingLabels);

        promise.subscribe(value => {
            this.gradebooks.push(value);
        });

    }


}
