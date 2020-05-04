import {Component, OnInit} from '@angular/core';
import {Course} from '../../Model/course';
import {CourseService} from '../../faculty/course/course.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {SessionManagerService} from '../../services/session-manager.service';
import {SiteService} from '../../services/site.service';
import {Site} from '../../Model/site';
import {User} from '../../Model/user';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-super-admin-user-create',
    templateUrl: './super-admin-user-edit.component.html',
    styleUrls: ['./super-admin-user-edit.component.css']
})
export class SuperAdminUserEditComponent implements OnInit {

    user = new User();

    constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private sessionManager: SessionManagerService) {
    }

    ngOnInit() {

        this.route.paramMap.subscribe(async value => {
            this.userService.get(value.get('userId'), (data) => {
                this.user = data;
            }, false);
        });
    }

    update() {
        this.userService.update(this.user.id, this.user, (data) => {
            this.router.navigate(['/superAdmin/dashboard']);
        });
    }
}
