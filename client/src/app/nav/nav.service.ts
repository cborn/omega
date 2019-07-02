import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {publishReplay, refCount} from 'rxjs/operators';




@Injectable()
export class NavService {

  _navData: Observable<any>;

  constructor(private httpClient: HttpClient) { }

  getNavData(): Observable<any> {
    if (!this._navData) {
      this._navData = this.httpClient.get(environment.serverUrl + 'application').pipe(publishReplay()).pipe(refCount());
    }
    return this._navData;
  }
}
