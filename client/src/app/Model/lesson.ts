import {LessonPage} from './lesson-page';
import {BaseObject} from '../Blueprints/base-object';

export class Lesson extends BaseObject{

    name: string;

    pages: LessonPage[];

}
