import {Question} from './question';
import {BaseObject} from '../Blueprints/base-object';

export class LessonPage extends BaseObject {

    name: string;
    pageOrder: number;
    questions: Question[];

}
