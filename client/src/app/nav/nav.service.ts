import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {publishReplay, refCount} from 'rxjs/operators';
import {AuthenticatedHttpClient} from '../authenticated-http-service.service';




@Injectable()
export class NavService {

  _navData: Observable<any>;

  constructor(private httpClient: AuthenticatedHttpClient) { }

  getNavData(): Observable<any> {
    if (!this._navData) {
      this._navData =  this.httpClient.get(AuthenticatedHttpClient.APPLICATION_URL).pipe(publishReplay()).pipe(refCount());
    }
    return this._navData;
  }
}
