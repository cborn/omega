import {Lesson} from './lesson';
import {Term} from './term';
import {BaseObject} from '../Blueprints/base-object';

export class Course extends BaseObject {

    name: string;

    moodle_master_id: string;

    lessons: Lesson[];

    term: Term;

}
