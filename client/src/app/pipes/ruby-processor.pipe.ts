import {Pipe, PipeTransform} from '@angular/core';
import {count} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import {LessonPageBuilderService} from '../faculty/lessonPage/lesson-page-builder/lesson-page-builder.service';

@Pipe({
    name: 'rubyProcessor'
})
export class RubyProcessorPipe implements PipeTransform {


    constructor(protected sanitizer: DomSanitizer, private lessonBuilderService: LessonPageBuilderService) {

    }

    transform(value: any, questionId?: number, questionNameChanged?: any, args?: any): any {

        if (value === undefined || value === '') {
            return value;
        }

        let newValue = value;


        let changed = false;
        const regex2 = new RegExp(/@RB/g);
        let result2;
        while ((result2 = regex2.exec(newValue)) !== null) {

            const replacementText = '<ruby>Ruby Text<rt>Click to edit</rt></ruby>';
            newValue = newValue.replace(regex2, replacementText);
            changed = true;

        }


        const regex = /<ruby>(.|\n)*?<\/ruby>/gm;
        let result;
        let index = 0;
        while ((result = regex.exec(newValue)) !== null) {
            let replacementText = '<div contenteditable="false" class="cloze_prompt" onclick="openRubyEditPrompt(' + index + ',' + questionId + ')">';
            replacementText += result[0].replace(/<(\/)?ruby>/gm, '').replace('<rt>', '(').replace('</rt>', ')');
            replacementText += '</div>';


            newValue = newValue.replace(result[0], replacementText);
            index++;

        }

        if (changed && questionNameChanged) {
            questionNameChanged.next(newValue);
        }


        return this.sanitizer.bypassSecurityTrustHtml(newValue);


    }

}
