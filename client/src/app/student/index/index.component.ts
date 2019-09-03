import {Component, OnInit} from '@angular/core';
import {NavService} from '../../nav/nav.service';
import {Route, Router} from '@angular/router';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-student-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class StudentIndexComponent implements OnInit {

  constructor(private navService: NavService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
  }

}
