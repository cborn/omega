import {BaseObject} from '../Blueprints/base-object';

export class Question extends BaseObject {

    constructor(type, position, name?) {
        super();
        this.required = false;
        this.type = type;
        this.custom_properties = {
            cloze_text: ''
        };
        this.position = position;
        if (type !== QuestionType.BLOCK_TEXT){
            this.max_grade = 1;
        } else {
            this.max_grade = 0;
        }


        if (name) {
            this.name = name;
        } else {
            this.name = 'Question ' + (this.position + 1);
        }

    }

    position: number;
    description: string;
    max_grade: number;
    name: string;
    required: boolean;
    type: QuestionType;
    prompts: {
        audioPrompt: {
            key: string,
            autoPlay: boolean,
            url: string
        }
        audioFeedback: {
            key: string,
            url: string
        },
        imagePrompt: {
            key: string,
            url: string
        }
    };
    custom_properties: any;


    static questionTypeList() {

        return [{name: 'Recording', value: QuestionType.VOICE},
            {name: 'Block Text', value: QuestionType.BLOCK_TEXT},
            {name: 'Multiple Choice', value: QuestionType.MULTI_CHOICE},
            {name: 'Short Answer', value: QuestionType.SHORT_TEXT},
            {name: 'Long Text', value: QuestionType.LONG_TEXT}];
            //{name: 'Date', value: QuestionType.DATE},
            //{name: 'Dropdown', value: QuestionType.DROPDOWN},
            //{name: 'Cloze', value: QuestionType.CLOZE},
            //{name: 'Number', value: QuestionType.NUMBER},
            //{name: 'Picture Choice', value: QuestionType.PICTURE_CHOICE},
            //{name: 'Scale', value: QuestionType.SCALE},
            //{name: 'Yes / No', value: QuestionType.BOOLEAN}];

    }


    static getTypeForString(type) {
        switch (type) {
            case 'BLOCK_TEXT':
                return QuestionType.BLOCK_TEXT;
            case 'BOOLEAN':
                return QuestionType.BOOLEAN;
            case 'CLOZE':
                return QuestionType.CLOZE;
            case 'DATE':
                return QuestionType.DATE;
            case 'DROPDOWN':
                return QuestionType.DROPDOWN;
            case 'LONG_TEXT':
                return QuestionType.LONG_TEXT;
            case 'MULTI_CHOICE':
                return QuestionType.MULTI_CHOICE;
            case 'NUMBER':
                return QuestionType.NUMBER;
            case 'PICTURE_CHOICE':
                return QuestionType.PICTURE_CHOICE;
            case 'SCALE':
                return QuestionType.SCALE;
            case 'SHORT_TEXT':
                return QuestionType.SHORT_TEXT;
            case 'VOICE':
                return QuestionType.VOICE;
        }
    }


}


export enum QuestionType {

    MULTI_CHOICE,
    SHORT_TEXT,
    LONG_TEXT,
    BLOCK_TEXT,
    PICTURE_CHOICE,
    BOOLEAN,
    SCALE,
    DATE,
    NUMBER,
    DROPDOWN,
    VOICE,
    CLOZE
}


