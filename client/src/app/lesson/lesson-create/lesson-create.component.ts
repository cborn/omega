import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonService} from '../lesson.service';
import {Lesson} from '../../Model/lesson';

@Component({
    selector: 'app-lesson-create',
    templateUrl: './lesson-create.component.html',
    styleUrls: ['./lesson-create.component.css']
})
export class LessonCreateComponent implements OnInit {

    lesson = new Lesson();


    constructor(private route: ActivatedRoute, private lessonService: LessonService, private router: Router) {
    }


    ngOnInit() {

        this.route.queryParamMap.subscribe(value => {
            if (value.get('courseId') != null) {
                console.log(value.get('courseId'));
                this.lesson.course = value.get('courseId');
            } else {
                this.router.navigate(['/lesson/index']);
            }
        });

    }

    create() {
        this.lessonService.insert(this.lesson, () => {
            this.router.navigate(['/lesson/index/' + this.lesson.course]);
        });
    }
}
