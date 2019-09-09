import {Component, OnInit} from '@angular/core';
import {Course} from '../../../Model/course';
import {CourseService} from '../course.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-course-create',
    templateUrl: './course-create.component.html',
    styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {


    course = new Course();

    constructor(private courseService: CourseService, private router: Router) {
    }

    ngOnInit() {
    }

    create() {
        this.courseService.insert(this.course, () => {
            this.router.navigate(['/course/index']);
        });
    }

}
