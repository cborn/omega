import {Question} from './question';
import {BaseObject} from '../Blueprints/base-object';
import {Submission} from './submission';

export class LessonPage extends BaseObject {

    static STATUS_PUBLISHED = 'PUBLISHED';
    static STATUS_DRAFT = 'DRAFT';


    name: string;
    pageOrder: number;
    questions: Question[];
    rubricGrading: boolean;
    rubricGradebook?: any;

    status: string;

    // not usually brought down, this is appended on after the fact.

    submissions: Submission[];


    public isPublished() {
         return this.status === LessonPage.STATUS_PUBLISHED;
    }




}
