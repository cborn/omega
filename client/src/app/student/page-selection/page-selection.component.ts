import {Component, OnInit} from '@angular/core';
import {PageSelectionService} from './page-selection.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-page-selection',
    templateUrl: './page-selection.component.html',
    styleUrls: ['./page-selection.component.css']
})
export class PageSelectionComponent implements OnInit {


    pages$ = this.pageSelectionService.pages;

    constructor(private pageSelectionService: PageSelectionService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {

        this.route.paramMap.subscribe(value => {
            if (value.get('lessonId')) {
                this.pageSelectionService.loadData(value.get('lessonId'));
            } else {
                this.router.navigate(['student/index']);
            }
        });
    }

    startNewSubmission(page) {
        this.pageSelectionService.addNewSubmission(page, submission => {

            this.router.navigate(['/student/submission' , submission.id]);

        });
    }


    continueSubmission(submissionId) {
        this.router.navigate(['/student/submission' , submissionId]);

    }

}
