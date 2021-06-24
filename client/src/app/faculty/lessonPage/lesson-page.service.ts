import {Injectable} from '@angular/core';
import {BaseService} from '../../Blueprints/base-service';
import {LessonPage} from '../../Model/lesson-page';
import {AuthenticatedHttpClient} from '../../services/authenticated-http-service.service';

@Injectable({
    providedIn: 'root'
})
export class LessonPageService extends BaseService<LessonPage> {

    constructor(private http: AuthenticatedHttpClient) {
        super(http, AuthenticatedHttpClient.LESSON_PAGE_URL, true);
    }


    async moveUp(id) {
        const promise = await this.http.get<LessonPage[]>(AuthenticatedHttpClient.LESSON_PAGE_MOVE_UP_URL + '/' + id);

        promise.subscribe(value => {
            this.serviceSubject.next(value);
        });

    }

    async moveDown(id) {
        const promise = await this.http.get<LessonPage[]>(AuthenticatedHttpClient.LESSON_PAGE_MOVE_DOWN_URL + '/' + id);

        promise.subscribe(value => {
            this.serviceSubject.next(value);
        });

    }

    async exportData(id) {
        const promise = await this.http.download(AuthenticatedHttpClient.LESSON_PAGE_EXPORT_URL + '/' + id);

        promise.subscribe(value => {
            this.getZipFile(value);
        });

    }


    private getZipFile(data: any) {
        const blob = new Blob([data['_body']], { type: 'application/zip' });

        const a: any = document.createElement('a');
        document.body.appendChild(a);

        a.style = 'display: none';
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'test.zip';
        a.click();
        window.URL.revokeObjectURL(url);

    }



    getClassName() {
        return 'Page';
    }

}
