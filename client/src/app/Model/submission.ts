import {BaseObject} from '../Blueprints/base-object';
import * as moment from 'moment';
import Base = moment.unitOfTime.Base;
import {SubmissionResponse} from './submissionResponse';
import {User} from './user';

export class Submission extends BaseObject {


        responses: SubmissionResponse[];
        page: BaseObject;
        term: BaseObject;
        user: User;
        lesson: BaseObject;
        status: string;
        submitted: Date;
        drafted: Date;






}
