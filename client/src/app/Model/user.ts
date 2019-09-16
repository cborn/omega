import {BaseObject} from '../Blueprints/base-object';

export class User extends BaseObject {


    passwordExpired: boolean;
    accountExpired: boolean;
    enrollments: [];
    surname: string;
    firstname: string;
    fromMoodle: boolean;
    username: string;
    fullName: string;
    accountLocked: boolean;
    password: string;
    enabled: boolean;

}
