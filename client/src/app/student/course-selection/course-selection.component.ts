import {Component, OnInit} from '@angular/core';
import {CourseSelectionService} from './course-selection.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonService} from '../../faculty/lesson/lesson.service';
import {Lesson} from '../../Model/lesson';
import {CourseService} from '../../faculty/course/course.service';
import {Course} from '../../Model/course';

@Component({
    selector: 'app-course-selection',
    templateUrl: './course-selection.component.html',
    styleUrls: ['./course-selection.component.css']
})
export class CourseSelectionComponent implements OnInit {


    course: Course;

    constructor(private courseService: CourseService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {

        this.route.paramMap.subscribe(value => {
            if (value.get('courseId')) {

                this.courseService.get(value.get('courseId'), data => {
                    this.course = data;
                });

            } else {
                this.router.navigate(['student/index']);
            }
        });
    }



}
