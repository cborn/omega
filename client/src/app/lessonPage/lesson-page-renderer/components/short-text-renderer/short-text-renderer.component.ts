import { Component, OnInit } from '@angular/core';
import {BaseRenderComponent} from '../../../../Blueprints/base-render-component';

@Component({
  selector: 'app-short-text-renderer',
  templateUrl: './short-text-renderer.component.html',
  styleUrls: ['./short-text-renderer.component.css']
})
export class ShortTextRendererComponent extends BaseRenderComponent implements OnInit {


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
