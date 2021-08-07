import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IndexComponent} from '../../../Blueprints/index-component';
import {NotificationService} from '../../../services/notification.service';
import {LessonPage} from '../../../Model/lesson-page';
import {LessonPageService} from '../lesson-page.service';
import {Question} from "../../../Model/question";
import {AuthenticatedHttpClient} from "../../../services/authenticated-http-service.service";
import {VoiceRendererComponent} from "../lesson-page-renderer/components/voice-renderer/voice-renderer.component";

@Component({
    selector: 'app-lesson-index',
    templateUrl: './lessonPageIndex.component.html',
    styleUrls: ['./lessonPageIndex.component.css']
})
export class LessonPageIndexComponent extends IndexComponent<LessonPage> {


    loading  =false;


    displayedColumns = ['id', 'name', 'actions'];

    @ViewChild('inputElement', {static: true})
    inputElement: HTMLInputElement;

    constructor(private lessonPageService: LessonPageService, private http: AuthenticatedHttpClient, private router: Router, private route: ActivatedRoute, private notificationService: NotificationService) {
        super(lessonPageService, notificationService, router, route, 'lessonId');
    }


    async importLessonPage(event) {
        // import a zip file...
        const file = event.target.files[0];

        this.loading = true;
        const uploadData = new FormData();
        uploadData.append('zipFile', file, 'IGNORED');
        const promise = await this.http.post(AuthenticatedHttpClient.LESSON_PAGE_IMPORT_URL+'/'+this.paramValue, uploadData);

        promise.subscribe(value => {
            this.loading = false;
            this.notificationService.doesRequireReload();
        }, error1 => {
            this.loading = false;
            console.log('ERROR');
        });


    }


    addNewLessonPageForEdit() {
        const uploadPackage = {
            lesson: this.paramValue,
            name: 'Untitled Page'
        };

        this.lessonPageService.insert(uploadPackage, (data) => {
            this.router.navigate(['/lessonPage/builder', data.id]);
        });
    }


    moveUp(id) {
        this.lessonPageService.moveUp(id);
    }

    moveDown(id) {
        this.lessonPageService.moveDown(id);
    }

    exportData(id) {
        this.lessonPageService.exportData(id);
    }


}
