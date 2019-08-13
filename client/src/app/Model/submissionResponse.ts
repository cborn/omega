import {BaseObject} from '../Blueprints/base-object';
import {ResponseComment} from './response-comment';

export class SubmissionResponse extends BaseObject {

    question: BaseObject;

    response: string;

    comments: ResponseComment[];
}
