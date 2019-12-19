import {Question} from '../Model/question';

export class AnswerChangedEvent {
    question: Question;
    value: any;
    shouldReloadFromWeb?: boolean;
}
