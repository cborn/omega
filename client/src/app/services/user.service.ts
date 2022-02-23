import {Injectable} from '@angular/core';
import {BaseService} from '../Blueprints/base-service';
import {User} from '../Model/user';
import {AuthenticatedHttpClient} from './authenticated-http-service.service';


@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService<User> {

    constructor(private h: AuthenticatedHttpClient) {
        super(h, AuthenticatedHttpClient.USER_URL);
    }


    async saveAsSuperAdmin(updatePackage, handler?) {
        const promise = await this.h.post<User>(this.URL + '/saveAsSuperAdmin', updatePackage);

        promise.subscribe(value => {
             if (handler) {
                handler(value);
            }

        });

    }

    async getEnrolled(lessonId) {
        const students = await this.h.get<User[]>((AuthenticatedHttpClient.ENROLLMENT_URL + '?student=true'), {}, false, false, true);
        const enrolled = {};

        students.subscribe(students => {
            if(students){
                for (let s of students) {
                    let i=0;
                    if (s.lesson.id == lessonId) {
                        enrolled[i] = s;
                        i = i + 1;
                        this.serviceSubject.next(s);
                        console.log('matched if')
                    } else {
                        continue;
                    }
                }
            }
        });

        return enrolled;
    }



    getClassName() {
        return 'User';
    }
}
