import {BaseObject} from '../Blueprints/base-object';
import {Course} from './course';
import {Submission} from './submission';
import {Site} from './site';

export class Term extends BaseObject {

    name: string;
    current: boolean;
    site: Site;
    courses: Course[];
    submissions: Submission[];
    enrollments: any[];

}
