export class Question {

    constructor(type) {
        this.id = 12;
        this.required = false;
        this.type = type;
        this.custom_properties = {
            cloze_text: ''
        };
    }

    description: string;
    id: number;
    max_grade: number;
    name: string;
    required: boolean;
    type: QuestionType;
    custom_properties: any;




    static questionTypeList() {

        return [{name: 'Block Text', value: QuestionType.BLOCK_TEXT},
            {name: 'Yes / No', value: QuestionType.BOOLEAN},
            {name: 'Cloze', value: QuestionType.CLOZE},
            {name: 'Date', value: QuestionType.DATE},
            {name: 'Dropdown', value: QuestionType.DROPDOWN},
            {name: 'Long Text', value: QuestionType.LONG_TEXT},
            {name: 'Multiple Choice', value: QuestionType.MULTI_CHOICE},
            {name: 'Number', value: QuestionType.NUMBER},
            {name: 'Picture Choice', value: QuestionType.PICTURE_CHOICE},
            {name: 'Scale', value: QuestionType.SCALE},
            {name: 'Short Text', value: QuestionType.SHORT_TEXT},
            {name: 'Recording', value: QuestionType.VOICE}];

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


