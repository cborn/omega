import {BaseObject} from '../Blueprints/base-object';

export class ResponseComment extends BaseObject {

    comment_text: string;

    user: {
        username
        firstname
        surname
    };

    location: number;

    voice_clip: string;

    submitted: Date;


}
