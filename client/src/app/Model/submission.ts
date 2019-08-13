import {BaseObject} from '../Blueprints/base-object';
import * as moment from 'moment';
import Base = moment.unitOfTime.Base;
import {SubmissionResponse} from './submissionResponse';

export class Submission extends BaseObject {


        responses: SubmissionResponse[];
        page: BaseObject;
        term: BaseObject;
        user: BaseObject;






}
