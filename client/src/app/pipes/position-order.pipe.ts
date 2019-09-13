import {Pipe, PipeTransform} from '@angular/core';
import {Question} from '../Model/question';
import {SubmissionResponse} from '../Model/submissionResponse';

@Pipe({
    name: 'positionOrder'
})
export class PositionOrderPipe implements PipeTransform {

    transform(items: any[] = [], order: string): any[] {

        if (items[0] != null && items[0].hasOwnProperty('question')) {
            return items.sort((prevSubmission: SubmissionResponse, nextSubmission: SubmissionResponse) => {
                if (order === 'desc') {
                    return nextSubmission.question.position - prevSubmission.question.position;
                } else {
                    return prevSubmission.question.position - nextSubmission.question.position;
                }
            });
        } else {
            return items.sort((prevQuestion: Question, nextQuestion: Question) => {
                if (order === 'desc') {
                    return nextQuestion.position - prevQuestion.position;
                } else {
                    return prevQuestion.position - nextQuestion.position;
                }
            });
        }


    }
}
