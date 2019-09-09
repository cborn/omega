import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../../Model/question';
import {BaseRenderComponent} from '../../../../../Blueprints/base-render-component';

@Component({
  selector: 'app-multi-choice-renderer',
  templateUrl: './multi-choice-renderer.component.html',
  styleUrls: ['./multi-choice-renderer.component.css']
})
export class MultiChoiceRendererComponent extends BaseRenderComponent implements OnInit {


  value;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  didSelect(value) {
    this.value = value;
    this.answerDidChange(this.question, this.value);
  }

  setValue(value) {
    this.value = value;
  }
}
