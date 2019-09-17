import {Component, OnInit} from '@angular/core';
import {LessonService} from '../../lesson/lesson.service';
import {LessonPageBuilderService} from '../lesson-page-builder/lesson-page-builder.service';
import {LessonPage} from '../../../Model/lesson-page';

@Component({
    selector: 'app-save-status',
    templateUrl: './save-status.component.html',
    styleUrls: ['./save-status.component.css']
})
export class SaveStatusComponent implements OnInit {

    isDirty$ = this.pageBuilderService.isDirty;
    lessonPage$ = this.pageBuilderService.editingLessonPage;


    constructor(private pageBuilderService: LessonPageBuilderService) {
    }

    ngOnInit() {

    }


    changed() {
        this.pageBuilderService.isDirtySubject.next(true);
    }

    updateStatus(lessonPage) {
        if (lessonPage.status === LessonPage.STATUS_PUBLISHED) {
            lessonPage.status = LessonPage.STATUS_DRAFT;
        } else {
            lessonPage.status = LessonPage.STATUS_PUBLISHED;
        }
        this.changed();
    }


}
