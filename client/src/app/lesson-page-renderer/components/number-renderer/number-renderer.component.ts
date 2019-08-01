import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../Model/question';

@Component({
  selector: 'app-number-renderer',
  templateUrl: './number-renderer.component.html',
  styleUrls: ['./number-renderer.component.css']
})
export class NumberRendererComponent implements OnInit {


  @Input() question: Question;
  value: string;

  constructor() { }

  ngOnInit() {
  }

}
