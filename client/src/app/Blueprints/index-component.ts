import {NotificationService} from '../services/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseService} from './base-service';
import {OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Course} from '../Model/course';
import {BaseObject} from './base-object';
import {LessonPageService} from '../faculty/lessonPage/lesson-page.service';

export abstract class IndexComponent<T extends BaseObject> implements OnInit {


    dataSource = new MatTableDataSource<T>([]);
    sourceData: T[];

    paramName = '';

    public paramValue;

    protected constructor(private service: BaseService<T>, private n: NotificationService, private r: Router, private rt: ActivatedRoute, paramName?: string) {
        this.paramName = paramName;

        this.n.reloadRequiredObserver.subscribe(value => {
            if (value) {
                this.loadData();
            }
        });
    }

    ngOnInit() {
        this.rt.paramMap.subscribe(value => {
            if (value.get(this.paramName) != null) {
                this.paramValue = value.get(this.paramName);
            }
            console.log("Load Data for component " + window.location.href);
            this.loadData();
        });

        this.service.serviceObservable.subscribe(value => {
            this.dataSource.data = value;
            this.sourceData =  value;
        });
    }


    loadData() {
        if (this.paramName != null) {
            this.service.list(this.paramValue, this.paramName);
        } else {
            this.service.list();
        }
    }

    delete(id) {
        this.n.publishConfirmation('Are you sure you want to delete this ' + this.service.getClassName() + '?', () => {
            this.service.delete(id);
        });
    }


}
