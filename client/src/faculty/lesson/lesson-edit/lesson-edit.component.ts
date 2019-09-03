import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonService} from '../lesson.service';
import {Lesson} from '../../../app/Model/lesson';

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.component.css']
})
export class LessonEditComponent implements OnInit {

  lesson = new Lesson();

  constructor(private route: ActivatedRoute, private lessonService: LessonService, private router: Router) {
  }


  ngOnInit() {


    this.route.paramMap.subscribe(async value => {
      this.lessonService.get(value.get('lessonId'), (data) => {
        this.lesson = data;
      });

    });


  }


  save() {
    this.lessonService.update(this.lesson.id, this.lesson, () => {
      this.router.navigate(['/lesson/index/' + this.lesson.course]);
    });
  }

}
