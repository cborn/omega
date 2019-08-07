import {Component, OnInit} from '@angular/core';
import {LessonService} from '../../lesson/lesson.service';
import {LessonPageBuilderService} from '../lesson-page-builder/lesson-page-builder.service';

@Component({
    selector: 'app-save-status',
    templateUrl: './save-status.component.html',
    styleUrls: ['./save-status.component.css']
})
export class SaveStatusComponent implements OnInit {

    isDirty$ = this.pageBuilderService.isDirty;


    constructor(private pageBuilderService: LessonPageBuilderService) {
    }

    ngOnInit() {

    }





}
