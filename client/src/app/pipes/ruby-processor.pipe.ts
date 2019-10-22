import {Pipe, PipeTransform} from '@angular/core';
import {count} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
    name: 'rubyProcessor'
})
export class RubyProcessorPipe implements PipeTransform {


    constructor(protected sanitizer: DomSanitizer) {

    }

    transform(value: any, questionId?: number, args?: any): any {

        let newValue = value;
        const regex = /<ruby>(.|\n)*?<\/ruby>/gm;
        let result;
        let index = 0;
        while ((result = regex.exec(value)) !== null) {
            let replacementText = '<div contenteditable="false" class="cloze_prompt" onclick="openRubyEditPrompt(' + index + ',' + questionId + ')">';
            replacementText += result[0].replace(/<(\/)?ruby>/gm, '').replace('<rt>', '(').replace('</rt>', ')');
            replacementText += '</div>';


            newValue = newValue.replace(result[0], replacementText);
            index++;

        }


        return this.sanitizer.bypassSecurityTrustHtml(newValue);


    }

}
