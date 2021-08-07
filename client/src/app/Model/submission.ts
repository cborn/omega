import {BaseObject} from '../Blueprints/base-object';
import * as moment from 'moment';
import Base = moment.unitOfTime.Base;
import {SubmissionResponse} from './submissionResponse';
import {User} from './user';
import {LessonPage} from './lesson-page';

export class Submission extends BaseObject {


        responses: SubmissionResponse[];
        page: LessonPage;
        term: BaseObject;
        user: User;
        lesson: BaseObject;
        status: string;
        submitted: Date;
        drafted: Date;
        grade: string;






}
