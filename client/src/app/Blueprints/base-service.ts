import {AuthenticatedHttpClient} from '../authenticated-http-service.service';
import {Course} from '../Model/course';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {BaseObject} from './base-object';

export abstract class BaseService<T extends BaseObject> {

    URL: string;


    constructor(private httpClient: AuthenticatedHttpClient, url: string) {
        this.URL = url;
    }

    serviceSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
    serviceObservable = this.serviceSubject.asObservable();

    async list(param?, paramName?) {
        const promise = await this.httpClient.get<T[]>(this.URL + (param != null ? ('?' + paramName + '=' + param) : ''));

        promise.subscribe(value => {
            this.serviceSubject.next(value);
        });
    }

    async get(id, handler) {
        const promise = await this.httpClient.get(this.URL + '/' + id);

        promise.subscribe(value => {
            handler(value);
        });
    }

    async delete(id, handler?) {
        const promise = await this.httpClient.delete(this.URL + '/' + id);

        promise.subscribe(value => {
            const tmpCourses = this.serviceSubject.value;
            let index = -1;

            for (const i in tmpCourses) {
                if (tmpCourses[i].id === id) {
                    index = parseInt(i, 0);
                }
            }

            if (index > -1) {
                tmpCourses.splice(index, 1);
            }

            this.serviceSubject.next(tmpCourses);

            if (handler) {
                handler();
            }
        });

    }

    async update(id, updatePackage, handler?) {
        const promise = await this.httpClient.put<T>(this.URL + '/' + id, updatePackage);

        promise.subscribe(value => {
            const tmpCourses = this.serviceSubject.value;
            let index = -1;

            for (const i in tmpCourses) {
                if (tmpCourses[i].id === id) {
                    index = parseInt(i, 0);
                }
            }

            if (index > -1) {
                tmpCourses[index] = updatePackage;
            }

            this.serviceSubject.next(tmpCourses);


            if (handler) {
                handler();
            }
        });
    }

    async insert(updatePackage, handler?) {
        const promise = await this.httpClient.post<T>(this.URL, updatePackage);

        promise.subscribe(value => {
            const tmpCourses = this.serviceSubject.value;
            tmpCourses.push(value);
            if (handler) {
                handler(value);
            }

        });

    }


}
