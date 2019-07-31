import {Component, Input, OnInit} from '@angular/core';
import {LessonPage} from '../../Model/lesson-page';

@Component({
    selector: 'app-lesson-renderer',
    templateUrl: './lesson-renderer.component.html',
    styleUrls: ['./lesson-renderer.component.css']
})
export class LessonRendererComponent implements OnInit {

    @Input() lesson: LessonPage;


    constructor() {
    }

    ngOnInit() {
    }

}
