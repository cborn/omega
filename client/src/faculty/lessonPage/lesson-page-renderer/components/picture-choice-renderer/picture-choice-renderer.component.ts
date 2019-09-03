import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../../app/Model/question';
import {BaseRenderComponent} from '../../../../../app/Blueprints/base-render-component';

@Component({
  selector: 'app-picture-choice-renderer',
  templateUrl: './picture-choice-renderer.component.html',
  styleUrls: ['./picture-choice-renderer.component.css']
})
export class PictureChoiceRendererComponent extends BaseRenderComponent implements OnInit {

  value;

  constructor() {
    super();
  }

  ngOnInit() {
  }


  doSelect(value) {
    this.value = value;
    this.answerDidChange(this.question, value);
  }

  setValue(value) {
    this.value = value;
  }
}
