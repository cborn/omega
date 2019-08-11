import {BaseObject} from '../Blueprints/base-object';
import * as moment from 'moment';
import Base = moment.unitOfTime.Base;
import {Response} from './response';

export class Submission extends BaseObject {


        responses: Response[];
        page: BaseObject;
        term: BaseObject;
        user: BaseObject;






}
