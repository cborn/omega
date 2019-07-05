import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../Model/question';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  questionTypes = Question.questionTypeList();


  @Input() question: Question;

  @Output() closeSidebar = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  closeSidebarAction() {
    this.closeSidebar.emit(true);
  }

}
