import {Component, OnInit} from '@angular/core';
import {Course} from '../../Model/course';
import {AuthenticatedHttpClient} from '../../authenticated-http-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../course.service';
import {MatTableDataSource} from '@angular/material';
import {NotificationService} from '../../notification.service';
import {IndexComponent} from '../../Blueprints/index-component';

@Component({
    selector: 'app-course-index',
    templateUrl: './courseIndex.component.html',
    styleUrls: ['./courseIndex.component.css']
})
export class CourseIndexComponent extends IndexComponent<Course> implements OnInit {

    displayedColumns = ['id', 'name', 'lessons', 'actions'];

    constructor(private courseService: CourseService, private notificationService: NotificationService, private router: Router, private route: ActivatedRoute) {
        super(courseService, notificationService, router, route);
    }

}
