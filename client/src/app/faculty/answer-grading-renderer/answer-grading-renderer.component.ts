import {Component, Input, OnInit} from '@angular/core';
import {SubmissionResponse} from '../../Model/submissionResponse';
import {Question, QuestionType} from '../../Model/question';

@Component({
  selector: 'app-answer-grading-renderer',
  templateUrl: './answer-grading-renderer.component.html',
  styleUrls: ['./answer-grading-renderer.component.css']
})
export class AnswerGradingRendererComponent implements OnInit {


  @Input() response: SubmissionResponse;
  @Input() question: Question;

  constructor() { }

  ngOnInit() {
  }


  isBordered() {
    return this.question.type === 0 || this.question.type === 4 ||  this.question.type === 5 ||  this.question.type === 9;
  }

  isCloze() {
    return this.question.type === QuestionType.CLOZE;
  }


  isAudio() {
    return this.question.type === QuestionType.VOICE;
  }

  isPicture() {
    return this.question.type === QuestionType.PICTURE_CHOICE;
  }
}
