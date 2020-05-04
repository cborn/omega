import {BaseObject} from '../Blueprints/base-object';

export class Alert extends BaseObject {


    title: string;
    body: string;
    alert_start: Date;
    alert_end: Date;

}
