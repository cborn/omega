import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonService} from '../lesson.service';
import {MatTableDataSource} from '@angular/material';
import {Course} from '../../../app/Model/course';
import {Lesson} from '../../../app/Model/lesson';
import {IndexComponent} from '../../../app/Blueprints/index-component';
import {NotificationService} from '../../../app/services/notification.service';
import {LessonPageService} from '../../lessonPage/lesson-page.service';

@Component({
    selector: 'app-lesson-index',
    templateUrl: './lessonIndex.component.html',
    styleUrls: ['./lessonIndex.component.css']
})
export class LessonIndexComponent extends IndexComponent<Lesson> {

    displayedColumns = ['id', 'name', 'pages', 'actions'];

    constructor(private lessonService: LessonService,  private lessonPageService: LessonPageService,  private router: Router, private route: ActivatedRoute, private notificationService: NotificationService) {
        super(lessonService, notificationService, router, route, 'courseId');
    }


    addPage(lesson) {
        const uploadPackage = {
            lesson: lesson,
            name: 'Untitled Page'
        };
        console.log(uploadPackage);

        this.lessonPageService.insert(uploadPackage, (data) => {
            this.router.navigate(['/lessonPage/builder', data.id]);
        });
    }



}
