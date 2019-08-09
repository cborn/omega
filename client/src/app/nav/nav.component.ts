import {Component} from '@angular/core';
import {NavService} from './nav.service';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    applicationData: any;

    constructor(private navService: NavService, private router: Router) {
    }

    ngOnInit(): void {
        this.loadData();
    }

    async loadData() {
        (await this.navService.getNavData()).subscribe(res => this.applicationData = res);
    }

    shouldShowSaveStatus() {
        return this.router.url.indexOf('lessonPage/builder') > -1;

    }
}
