import {Component, OnInit} from '@angular/core';
import {CourseService} from '../course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../../Model/course';

@Component({
    selector: 'app-course-edit',
    templateUrl: './course-edit.component.html',
    styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {


    course: Course;

    constructor(private courseService: CourseService, private router: Router, private route: ActivatedRoute) {


    }

    ngOnInit() {


        this.route.paramMap.subscribe(async value => {
            this.courseService.get(value.get('courseId'),(data) => {
                this.course = data;
            });

        });


    }

    save() {
        this.courseService.update(this.course.id, this.course, () => {
            this.router.navigate(['/course/index']);
        });
    }

}
