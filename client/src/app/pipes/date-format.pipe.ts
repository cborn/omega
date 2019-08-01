import { Pipe, PipeTransform } from '@angular/core';
import {FormControl} from '@angular/forms';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
  }

}
