import {LessonPage} from './lesson-page';
import {BaseObject} from '../Blueprints/base-object';

export class Lesson extends BaseObject {

    name: string;

    due: Date;

    course: string;

    pages: LessonPage[];

}
