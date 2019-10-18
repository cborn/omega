import {Component, OnInit} from '@angular/core';
import {Course} from '../../../Model/course';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../course.service';
import {NotificationService} from '../../../services/notification.service';
import {IndexComponent} from '../../../Blueprints/index-component';
import {PERMISSION_ROLE, SessionManagerService} from '../../../services/session-manager.service';

@Component({
    selector: 'app-course-index',
    templateUrl: './courseIndex.component.html',
    styleUrls: ['./courseIndex.component.css']
})
export class CourseIndexComponent extends IndexComponent<Course> implements OnInit {

    displayedColumns = ['id', 'name', 'lessons', 'actions'];

    isStudent = false;

    constructor(private courseService: CourseService, private notificationService: NotificationService, private router: Router, private route: ActivatedRoute, private sessionManagerService: SessionManagerService) {
        super(courseService, notificationService, router, route);
        if (!sessionManagerService.checkRoles(PERMISSION_ROLE.ROLE_GRADER)) {
            this.displayedColumns = ['id', 'name', 'lessons'];
            this.isStudent = true;
        }

    }

}
