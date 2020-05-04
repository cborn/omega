import {Component, OnInit} from '@angular/core';
import {Course} from '../../../Model/course';
import {CourseService} from '../course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionManagerService} from '../../../services/session-manager.service';
import {UserService} from '../../../services/user.service';
import {User} from '../../../Model/user';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {


    user = new User();

    constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private sessionManager: SessionManagerService) {
    }

    ngOnInit() {


        this.route.paramMap.subscribe(async value => {
            this.userService.get(value.get('userId'), (data) => {
                this.user = data;
            });

        });


    }

    save() {
        this.userService.update(this.user.id, this.user, () => {
            this.router.navigate(['/user/index']);
        });
    }

}
