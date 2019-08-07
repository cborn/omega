import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../Model/question';

@Component({
  selector: 'app-multi-choice-renderer',
  templateUrl: './multi-choice-renderer.component.html',
  styleUrls: ['./multi-choice-renderer.component.css']
})
export class MultiChoiceRendererComponent implements OnInit {

  @Input() question: Question;

  value;

  constructor() { }

  ngOnInit() {
  }

  didSelect(value) {
    this.value = value;
  }
}
