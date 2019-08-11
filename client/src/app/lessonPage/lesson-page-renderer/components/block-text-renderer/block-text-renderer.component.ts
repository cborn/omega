import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-block-text-renderer',
  templateUrl: './block-text-renderer.component.html',
  styleUrls: ['./block-text-renderer.component.css']
})
export class BlockTextRendererComponent implements OnInit {

  @Input() question;

  constructor() { }

  ngOnInit() {
  }

}
