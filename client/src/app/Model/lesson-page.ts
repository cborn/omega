import {Question} from './question';
import {BaseObject} from '../Blueprints/base-object';

export class LessonPage extends BaseObject {

    id: number;
    questions: Question[];

}
