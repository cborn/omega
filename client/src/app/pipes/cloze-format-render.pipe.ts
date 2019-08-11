import {Pipe, PipeTransform} from '@angular/core';
import {count} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
    name: 'clozeFormatRender'
})
export class ClozeFormatRenderPipe implements PipeTransform {


    constructor(protected sanitizer: DomSanitizer) {

    }

    // The magic is all in this pipe..
    transform(value: any, cloze_prompts?: any, args?: any): any {

        let newValue = value;
        const regex = new RegExp(/@@/g);
        let result;
        let instancesCount = 0;
        const questionid = args.id;
        while ((result = regex.exec(value)) !== null) {
            const prompts = JSON.parse(args.custom_properties.cloze_prompts)[instancesCount];


            let replacementText = '';

            if (prompts.length > 0) {
                replacementText += '<select class="classic-input-style cloze-input-item"><option disabled selected>Please select an answer</option>';
                for (const promptsKey in prompts) {
                    if (prompts.hasOwnProperty(promptsKey)) {
                        replacementText += '<option >' + prompts[promptsKey] + '</option>';
                    }
                }
                replacementText += '</select>';

            } else {
                replacementText += '<input matInput class="classic-input-style cloze-input-item" placeholder="Type your answer here" />';
            }


            newValue = newValue.replace('@@', replacementText);

            instancesCount++;

        }

        return this.sanitizer.bypassSecurityTrustHtml(newValue);


    }

}
