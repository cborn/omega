import {Question} from '../Model/question';

export class AnswerChangedEvent {
    question: Question;
    value: string;
    shouldReloadFromWeb?: boolean;
}
