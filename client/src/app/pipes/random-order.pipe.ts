import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'randomOrder'
})
export class RandomOrderPipe implements PipeTransform {

    transform(value: string[], ...args: any[]): any {

    }

}
