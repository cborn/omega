import {Pipe, PipeTransform} from '@angular/core';
import {count} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
    name: 'clozeFormat'
})
export class ClozeFormatPipe implements PipeTransform {


    constructor(protected sanitizer: DomSanitizer) {

    }

    transform(value: any, cloze_prompts?: any, args?: any): any {

        let newValue = value;
        const regex = new RegExp(/@@/g);
        let result;
        let instancesCount = 0;
        const questionid = args.id;
        while ((result = regex.exec(value)) !== null) {

            console.log(JSON.parse(args.custom_properties.cloze_prompts));
            console.log(instancesCount);

            const prompts = JSON.parse(args.custom_properties.cloze_prompts)[instancesCount];


            let replacementText = '<div contenteditable="false" class="cloze_prompt" onclick="openPrompt(' + instancesCount + ','+ questionid +')">';

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
