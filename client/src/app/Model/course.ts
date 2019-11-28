import {Lesson} from './lesson';
import {Term} from './term';

export class Course {

    id: number;

    name: string;

    moodle_master_id: string;

    lessons: Lesson[];

    term: Term;


}
