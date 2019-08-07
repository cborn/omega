import {NotificationService} from '../notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseService} from './base-service';
import {OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Course} from '../Model/course';
import {BaseObject} from './base-object';
import {LessonPageService} from '../lessonPage/lesson-page.service';

export abstract class IndexComponent<T extends BaseObject> implements OnInit {


    dataSource = new MatTableDataSource<T>([]);
    paramName = '';
    public paramValue;

    protected constructor(private service: BaseService<T>, private n: NotificationService, private r: Router, private rt: ActivatedRoute, paramName?: string) {
            this.paramName = paramName;
    }

    ngOnInit() {
        this.rt.paramMap.subscribe(value => {

            if (value.get(this.paramName) != null) {

                this.paramValue = value.get(this.paramName);
                console.log(this.paramValue);

                this.service.list(value.get(this.paramName), this.paramName);
            } else {
                this.service.list();
            }


        });


        this.service.serviceObservable.subscribe(value => {
            this.dataSource.data = value;
        });
    }


    delete(id) {
        this.n.publishConfirmation('Are you sure you want to delete this course?', () => {
            this.service.delete(id);
        });
    }


}
