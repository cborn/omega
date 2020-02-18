import { Injectable } from '@angular/core';
import {BaseService} from '../Blueprints/base-service';
import {Term} from '../Model/term';
import {AuthenticatedHttpClient} from '../services/authenticated-http-service.service';

@Injectable({
  providedIn: 'root'
})
export class TermService extends BaseService<Term> {

  constructor(private http: AuthenticatedHttpClient) {
    super(http, AuthenticatedHttpClient.TERM_URL);
  }

  getClassName() {
    return 'Term';
  }


  async promoteToCurrent(id) {
    const promise = await this.http.get( AuthenticatedHttpClient.TERM_PROMOTE_URL + '/' + id);

    promise.subscribe(value => {
      console.log(value);
      this.serviceSubject.next(value);
    });
  }

}
