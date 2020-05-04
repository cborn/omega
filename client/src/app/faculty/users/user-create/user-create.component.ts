import {Component, OnInit} from '@angular/core';
import {Course} from '../../../Model/course';
import {CourseService} from '../course.service';
import {Router} from '@angular/router';
import {SessionManagerService} from '../../../services/session-manager.service';
import {UserService} from '../../../services/user.service';
import {User} from '../../../Model/user';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {


    user = new User();

    constructor(private userService: UserService, private router: Router, private sessionManager: SessionManagerService) {
    }

    ngOnInit() {
        this.user.role = 'ROLE_ADMIN';
    }

    create() {

        this.userService.insert(this.user, () => {
            this.router.navigate(['/user/index']);
        });
    }

}
