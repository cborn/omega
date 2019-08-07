import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../Model/question';

@Component({
  selector: 'app-cloze-renderer',
  templateUrl: './cloze-renderer.component.html',
  styleUrls: ['./cloze-renderer.component.css']
})
export class ClozeRendererComponent implements OnInit {

  @Input() question: Question;


  constructor() { }

  ngOnInit() {
  }

}
