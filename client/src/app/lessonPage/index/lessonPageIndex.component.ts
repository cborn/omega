import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IndexComponent} from '../../Blueprints/index-component';
import {NotificationService} from '../../notification.service';
import {LessonPage} from '../../Model/lesson-page';
import {LessonPageService} from '../lesson-page.service';

@Component({
    selector: 'app-lesson-index',
    templateUrl: './lessonPageIndex.component.html',
    styleUrls: ['./lessonPageIndex.component.css']
})
export class LessonPageIndexComponent extends IndexComponent<LessonPage> {

    displayedColumns = ['id', 'actions'];

    constructor(private lessonPageService: LessonPageService, private router: Router, private route: ActivatedRoute, private notificationService: NotificationService) {
        super(lessonPageService, notificationService, router, route, 'lessonId');
    }


    addNewLessonPageForEdit() {
        console.log('Add new page..');
    }

}
