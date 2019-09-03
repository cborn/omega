import {Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {Question} from '../../../../../app/Model/question';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-lesson-question',
  templateUrl: './lesson-question.component.html',
  styleUrls: ['./lesson-question.component.css']
})
export class LessonQuestionComponent implements OnInit {

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;
  @ViewChild('autosize2', {static: false}) autosize2: CdkTextareaAutosize;

  @Input() question: Question;

  @Input() selectedQuestion: number;

  @Output() questionSelected = new EventEmitter();
  @Output() questionDeleted = new EventEmitter();
  @Output() questionChanged = new EventEmitter();


  constructor(private _ngZone: NgZone) {


  }

  ngOnInit() {

    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => {
          this.autosize.resizeToFitContent(true);
          if (this.autosize2 != null) {
            this.autosize2.resizeToFitContent(true);
          }
          });

  }

  isChanged() {
    this.questionChanged.emit(true);
  }



  toggleSidebar() {
    this.questionSelected.emit(this.question);
  }

  isSelected() {
    return this.selectedQuestion === this.question.id;
  }

  delete() {
    this.questionDeleted.emit(this.question);
  }

}
