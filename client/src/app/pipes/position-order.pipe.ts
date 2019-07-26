import { Pipe, PipeTransform } from '@angular/core';
import {Question} from '../Model/question';

@Pipe({
  name: 'positionOrder'
})
export class PositionOrderPipe implements PipeTransform {

  transform(questions: Question[] = [], order: string): Question[] {
    return questions.sort((prevQuestion: Question, nextQuestion: Question) => {
      if (order === 'desc') {
        return nextQuestion.position - prevQuestion.position;
      } else {
        return prevQuestion.position - nextQuestion.position;
      }
    });
  }
}
