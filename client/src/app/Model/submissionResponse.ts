import {BaseObject} from '../Blueprints/base-object';
import {ResponseComment} from './response-comment';
import {Question} from './question';

export class SubmissionResponse extends BaseObject {

    question: Question;

    response: string;

    comments: ResponseComment[];

    grade: number;



}
