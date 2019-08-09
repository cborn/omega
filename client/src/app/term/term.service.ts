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
}
