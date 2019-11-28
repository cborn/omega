import {BaseObject} from '../Blueprints/base-object';

export class Site extends BaseObject {


    name: string;
    awsSecretKey: string;
    awsAccessKey: string;
    awsBucketRegion = 'none';
    awsBucketName: string;
    moodleUrl: string;
    moodleKey: string;

}
