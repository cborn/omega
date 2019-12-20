import {Pipe, PipeTransform} from '@angular/core';
import {count} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import {SubmissionResponse} from '../Model/submissionResponse';

@Pipe({
    name: 'clozeFormatRender'
})
export class ClozeFormatRenderPipe implements PipeTransform {


    constructor(protected sanitizer: DomSanitizer) {

    }

    // The magic is all in this pipe..
    transform(value: any, cloze_prompts?: any, question?: any, grading?: boolean, response?: SubmissionResponse): any {

        let newValue = value;
        const regex = new RegExp(/@@/g);
        let result;
        let instancesCount = 0;
        const responseId = (response == null) ? null : response.id;


        while ((result = regex.exec(value)) !== null) {
            const prompts = JSON.parse(question.custom_properties.cloze_prompts)[instancesCount];
            let responseValue = '';

            if (response != null && response.response != null) {
                if (response.response.indexOf('@@') > -1) {
                    responseValue = response.response.split('@@')[instancesCount];
                } else if(instancesCount === 0) {
                    responseValue = response.response;
                }
            }

            let replacementText = '';
            if (!grading) {
                if (prompts.length > 0) {
                    replacementText += '<select class="classic-input-style cloze-input-item" onchange="inputForSubmissionChanged(' + responseId + ',' + instancesCount + ',this.value)"><option disabled selected>Please select an answer</option>';
                    for (const promptsKey in prompts) {
                        if (prompts.hasOwnProperty(promptsKey)) {
                            replacementText += '<option ' + (responseValue === prompts[promptsKey] ? 'selected="true"' : '') + '>' + prompts[promptsKey] + '</option>';
                        }
                    }
                    replacementText += '</select>';

                } else {
                    replacementText += '<input matInput class="classic-input-style cloze-input-item" value="' + responseValue + '" placeholder="Type your answer here" onchange="inputForSubmissionChanged(' + responseId + ',' + instancesCount + ',this.value)" />';
                }
            } else if (grading && response != null) {
                replacementText += '<span class="bordered-option cloze">' + response.response.split('@@')[instancesCount] + '</span>';
            }


            newValue = newValue.replace('@@', replacementText);

            instancesCount++;

        }

        return this.sanitizer.bypassSecurityTrustHtml(newValue);


    }

}
