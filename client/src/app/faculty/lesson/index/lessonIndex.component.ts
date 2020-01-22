import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonService} from '../lesson.service';
import {MatTableDataSource} from '@angular/material';
import {Course} from '../../../Model/course';
import {Lesson} from '../../../Model/lesson';
import {IndexComponent} from '../../../Blueprints/index-component';
import {NotificationService} from '../../../services/notification.service';
import {LessonPageService} from '../../lessonPage/lesson-page.service';
import {PERMISSION_ROLE, SessionManagerService} from '../../../services/session-manager.service';

@Component({
    selector: 'app-lesson-index',
    templateUrl: './lessonIndex.component.html',
    styleUrls: ['./lessonIndex.component.css']
})
export class LessonIndexComponent extends IndexComponent<Lesson> {

    displayedColumns = ['id', 'name', 'pages', 'actions'];

    constructor(private lessonService: LessonService, private sessionManager: SessionManagerService, private lessonPageService: LessonPageService, private router: Router, private route: ActivatedRoute, private notificationService: NotificationService) {
        super(lessonService, notificationService, router, route, 'courseId');
    }


    addPage(lesson) {
        const uploadPackage = {
            lesson: lesson,
            name: 'Untitled Page'
        };

        this.lessonPageService.insert(uploadPackage, (data) => {
            this.router.navigate(['/lessonPage/builder', data.id]);
        });
    }

    isFaculty() {
        return this.sessionManager.checkRoles(PERMISSION_ROLE.ROLE_FACULTY);
    }


}
