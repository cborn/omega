import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../Model/question';
import {BaseRenderComponent} from '../../../../Blueprints/base-render-component';

@Component({
  selector: 'app-number-renderer',
  templateUrl: './number-renderer.component.html',
  styleUrls: ['./number-renderer.component.css']
})
export class NumberRendererComponent extends BaseRenderComponent implements OnInit {


  value: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  setValue(value) {
    this.value = value;
  }



}
