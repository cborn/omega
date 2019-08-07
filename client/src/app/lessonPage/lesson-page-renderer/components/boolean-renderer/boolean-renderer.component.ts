import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boolean-renderer',
  templateUrl: './boolean-renderer.component.html',
  styleUrls: ['./boolean-renderer.component.css']
})
export class BooleanRendererComponent implements OnInit {


  value:boolean;

  constructor() { }

  ngOnInit() {
  }

  didSelect(value) {
    this.value = value;
  }

}
