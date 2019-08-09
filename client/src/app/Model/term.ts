import {BaseObject} from '../Blueprints/base-object';
import {Course} from './course';
import {Submission} from './submission';

export class Term extends BaseObject {

    name: string;
    current: boolean;
    courses: Course[];
    submissions: Submission[];

}
