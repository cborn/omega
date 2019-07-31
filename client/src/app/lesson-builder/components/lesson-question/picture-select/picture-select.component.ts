import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../Model/question';

@Component({
  selector: 'app-picture-select',
  templateUrl: './picture-select.component.html',
  styleUrls: ['./picture-select.component.css']
})
export class PictureSelectComponent implements OnInit {

  @Input() question: Question;

  workingCopy;

  constructor() { }

  ngOnInit() {

    if (this.question.custom_properties.pictures === undefined) {
      this.question.custom_properties.pictures = '';
    }

    this.workingCopy = this.question.custom_properties.pictures;

  }

}
