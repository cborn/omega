import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '../../environments/environment';

@Pipe({
    name: 'imageUrlFilter'
})
export class ImageUrlFilterPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return 'https://s3-eu-central-1.amazonaws.com/omegadev/images/' + value;
    }

}
