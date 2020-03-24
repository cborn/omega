import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {CourseSelectionService} from './course-selection.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonService} from '../../faculty/lesson/lesson.service';
import {Lesson} from '../../Model/lesson';
import {CourseService} from '../../faculty/course/course.service';
import {Course} from '../../Model/course';


@Pipe({
    name: 'lessonFilter'
})
export class LessonFilterPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {

        const option = args[0];

        if(option == "all") {
            return value;
        }
        else {
            var returnValue = [];

            for (const i in value) {
                if(value[i].id === option) {
                    returnValue.push(value[i]);
                }
            }

            return returnValue;
        }





    }


}


@Component({
    selector: 'app-course-selection',
    templateUrl: './course-selection.component.html',
    styleUrls: ['./course-selection.component.css']
})
export class CourseSelectionComponent implements OnInit {


    course: Course;

    filter:string = "all";

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
