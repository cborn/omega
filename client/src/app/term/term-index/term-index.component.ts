import {Component, OnInit} from '@angular/core';
import {IndexComponent} from '../../Blueprints/index-component';
import {Term} from '../../Model/term';
import {CourseService} from '../../faculty/course/course.service';
import {NotificationService} from '../../services/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TermService} from '../term.service';

@Component({
    selector: 'app-term-index',
    templateUrl: './term-index.component.html',
    styleUrls: ['./term-index.component.css']
})
export class TermIndexComponent extends IndexComponent<Term> implements OnInit {

    displayedColumns = ['id', 'name', 'active', 'actions'];

    constructor(private termService: TermService, private notificationService: NotificationService, private router: Router, private route: ActivatedRoute) {
        super(termService, notificationService, router, route);
    }



    makeCurrent(term) {
        // Do something to make it current
        this.termService.promoteToCurrent(term.id);

    }
}
