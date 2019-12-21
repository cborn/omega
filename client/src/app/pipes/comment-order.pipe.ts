import {Pipe, PipeTransform} from '@angular/core';
import {ResponseComment} from '../Model/response-comment';

@Pipe({
    name: 'commentOrder'
})
export class CommentOrderPipe implements PipeTransform {

    transform(value: ResponseComment[], ...args: any[]): any {

        return value.sort((a, b) => {

            return (new Date(a.submitted).getTime()) - (new Date(b.submitted).getTime());
        });


    }

}
