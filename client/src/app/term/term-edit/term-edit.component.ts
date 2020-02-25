import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Term} from '../../Model/term';
import {SessionManagerService} from '../../services/session-manager.service';
import {TermService} from '../term.service';

@Component({
    selector: 'app-term-edit',
    templateUrl: './term-edit.component.html',
    styleUrls: ['./term-edit.component.css']
})
export class TermEditComponent implements OnInit {


    term: Term;

    constructor(private termService: TermService, private router: Router, private route: ActivatedRoute, private sessionManager: SessionManagerService) {
    }

    ngOnInit() {


        this.route.paramMap.subscribe(async value => {
            this.termService.get(value.get('termId'), (data) => {
                this.term = data;
            });

        });


    }

    save() {
        this.termService.update(this.term.id, this.term, () => {
            this.router.navigate(['/term/index']);
        });
    }

}
