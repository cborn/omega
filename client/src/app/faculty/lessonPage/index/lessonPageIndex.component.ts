import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IndexComponent} from '../../../Blueprints/index-component';
import {NotificationService} from '../../../services/notification.service';
import {LessonPage} from '../../../Model/lesson-page';
import {LessonPageService} from '../lesson-page.service';

@Component({
    selector: 'app-lesson-index',
    templateUrl: './lessonPageIndex.component.html',
    styleUrls: ['./lessonPageIndex.component.css']
})
export class LessonPageIndexComponent extends IndexComponent<LessonPage> {

    displayedColumns = ['id', 'name', 'actions'];

    constructor(private lessonPageService: LessonPageService, private router: Router, private route: ActivatedRoute, private notificationService: NotificationService) {
        super(lessonPageService, notificationService, router, route, 'lessonId');
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


}
