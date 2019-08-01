import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../Model/question';

@Component({
  selector: 'app-dropdown-renderer',
  templateUrl: './dropdown-renderer.component.html',
  styleUrls: ['./dropdown-renderer.component.css']
})
export class DropdownRendererComponent implements OnInit {

  @Input() question: Question;

  value: string;



  constructor() { }

  ngOnInit() {
  }

}
