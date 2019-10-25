import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '../../environments/environment';
import {SessionManagerService} from '../services/session-manager.service';

@Pipe({
    name: 'imageUrlFilter'
})
export class ImageUrlFilterPipe implements PipeTransform {

    constructor(private sessionManager: SessionManagerService) {
    }


    transform(value: any, args?: any): any {
        return 'https://s3-eu-central-1.amazonaws.com/' + this.sessionManager.bucket + '/images/' + value;
    }

}
