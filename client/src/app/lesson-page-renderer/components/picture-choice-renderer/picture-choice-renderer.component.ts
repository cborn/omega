import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../Model/question';

@Component({
  selector: 'app-picture-choice-renderer',
  templateUrl: './picture-choice-renderer.component.html',
  styleUrls: ['./picture-choice-renderer.component.css']
})
export class PictureChoiceRendererComponent implements OnInit {

  value;

  @Input() question: Question;

  constructor() { }

  ngOnInit() {
  }


  doSelect(value) {
    this.value = value;
  }
}
