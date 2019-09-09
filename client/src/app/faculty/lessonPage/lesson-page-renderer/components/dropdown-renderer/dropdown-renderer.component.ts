import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../../Model/question';
import {BaseRenderComponent} from '../../../../../Blueprints/base-render-component';

@Component({
  selector: 'app-dropdown-renderer',
  templateUrl: './dropdown-renderer.component.html',
  styleUrls: ['./dropdown-renderer.component.css']
})
export class DropdownRendererComponent extends BaseRenderComponent implements OnInit {

  value: string;



  constructor() {
    super();
  }

  ngOnInit() {
  }

  didSelectItem(change) {
    this.answerDidChange(this.question, change.value);
  }



  setValue(value) {
    this.value = value;
  }
}
