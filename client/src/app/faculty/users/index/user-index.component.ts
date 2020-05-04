import {Component, OnInit} from '@angular/core';
import {Course} from '../../../Model/course';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../course.service';
import {NotificationService} from '../../../services/notification.service';
import {IndexComponent} from '../../../Blueprints/index-component';
import {PERMISSION_ROLE, SessionManagerService} from '../../../services/session-manager.service';
import {User} from '../../../Model/user';
import {UserService} from '../../../services/user.service';

@Component({
    selector: 'app-user-index',
    templateUrl: './user-index.component.html',
    styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent extends IndexComponent<User> implements OnInit {

    displayedColumns = ['id', 'username', 'fullName', 'fromMoodle', 'actions'];


    constructor(private userService: UserService, private notificationService: NotificationService, private router: Router, private route: ActivatedRoute, private sessionManagerService: SessionManagerService) {
        super(userService, notificationService, router, route);

    }

}
