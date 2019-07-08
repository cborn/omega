import {Pipe, PipeTransform} from '@angular/core';
import {count} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
    name: 'clozeFormat'
})
export class ClozeFormatPipe implements PipeTransform {


    constructor(protected sanitizer: DomSanitizer){

    }

    transform(value: any, args?: any): any {

        let newValue = value;
        const regex = new RegExp(/@@/g);
        let result;
        let instancesCount = 0;
        while ((result = regex.exec(value)) !== null) {
            const prompts = JSON.parse(args)[instancesCount];

            let replacementText = '<div contenteditable="false" class="cloze_prompt" onclick="openPrompt(' + instancesCount + ')">';

            if (prompts.length > 0) {
                replacementText += prompts.length + ' options<i class="material-icons align-middle">arrow_drop_down</i>';
            } else {
                replacementText += 'Text Input';
            }

            replacementText += '</div>';


            newValue = newValue.replace('@@', replacementText);

            instancesCount++;

        }


        return this.sanitizer.bypassSecurityTrustHtml(newValue);


    }

}
