import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Term} from '../../Model/term';
import {SessionManagerService} from '../../services/session-manager.service';
import {TermService} from '../term.service';

@Component({
    selector: 'app-course-create',
    templateUrl: './term-create.component.html',
    styleUrls: ['./term-create.component.css']
})
export class TermCreateComponent implements OnInit {


    term = new Term();

    constructor(private termService: TermService, private router: Router, private sessionManager: SessionManagerService) {
    }

    ngOnInit() {
    }

    create() {
        this.termService.insert(this.term, () => {
            this.router.navigate(['/term/index']);
        });
    }

}
