import {Component, Input, OnInit} from '@angular/core';
import {PageSelectionService} from './page-selection.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonService} from '../../faculty/lesson/lesson.service';
import {Lesson} from '../../Model/lesson';
import {LessonPage} from '../../Model/lesson-page';
import has = Reflect.has;

@Component({
    selector: 'app-page-selection',
    templateUrl: './page-selection.component.html',
    styleUrls: ['./page-selection.component.css']
})
export class PageSelectionComponent implements OnInit {


    pages$ = this.pageSelectionService.pages;

    // Input pages
    pages: LessonPage[] = [];


    @Input()
    lesson: Lesson;

    isComponent = false;

    constructor(private pageSelectionService: PageSelectionService, private route: ActivatedRoute, private router: Router, private lessonService: LessonService) {
    }

    ngOnInit() {

        this.route.paramMap.subscribe(value => {

            if (this.lesson != null) {
                this.isComponent = true;
                this.pageSelectionService.loadData(this.lesson.id, data => {
                    this.pages = data;
                });
            } else {
                if (value.get('lessonId')) {
                    this.pageSelectionService.loadData(value.get('lessonId'));
                    this.lessonService.get(value.get('lessonId'), data => {
                        this.lesson = data;
                    });
                } else {
                    this.router.navigate(['student/index']);
                }
            }
        });
    }

    startNewSubmission(page) {
        this.pageSelectionService.addNewSubmission(page, submission => {

            this.router.navigate(['/student/submission', submission.id]);

        });
    }


    hasLessons() {
        let hasLesson = false;

        if (this.isComponent) {
            this.pages.forEach(value => {
                if (value.status === 'PUBLISHED') {
                    hasLesson = true;
                }
            });
        } else {

            this.pageSelectionService.pagesSubject.value.forEach(value => {
                if (value.status === 'PUBLISHED') {
                    hasLesson = true;
                }
            });
        }


        return hasLesson;

    }


    hasCompletedPage(value) {
        let hasCompleted = false;

        if (this.isComponent) {
                if (value.submissions) {
                    value.submissions.forEach(value1 => {
                        if (value1.status !== 'DRAFT') {
                            hasCompleted = true;
                        }
                    });
                }
        } else {

                if (value.submissions) {
                    value.submissions.forEach(value1 => {
                        if (value1.status !== 'DRAFT') {
                            hasCompleted = true;
                        }
                    });
                }
        }


        return hasCompleted;
    }


    continueSubmission(submissionId) {
        this.router.navigate(['/student/submission', submissionId]);

    }

}
