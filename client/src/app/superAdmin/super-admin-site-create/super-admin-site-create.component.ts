import {Component, OnInit} from '@angular/core';
import {Course} from '../../Model/course';
import {CourseService} from '../../faculty/course/course.service';
import {Router} from '@angular/router';
import {SessionManagerService} from '../../services/session-manager.service';
import {SiteService} from '../../services/site.service';
import {Site} from '../../Model/site';

@Component({
  selector: 'app-super-admin-site-create',
  templateUrl: './super-admin-site-create.component.html',
  styleUrls: ['./super-admin-site-create.component.css']
})
export class SuperAdminSiteCreateComponent implements OnInit {

  regions = [
    {
      name: 'US East (Ohio)',
      value: 'us-east-2'
    },
    {
      name: 'US East (N. Virginia)',
      value: 'us-east-1'
    },
    {
      name: 'US West (N. California)',
      value: 'us-west-1'
    },
    {
      name: 'US West (Oregon)',
      value: 'us-west-2'
    },
    {
      name: 'Asia Pacific (Hong Kong)',
      value: 'ap-east-1'
    },
    {
      name: 'Asia Pacific (Mumbai)',
      value: 'ap-south-1'
    }, {
      name: 'Asia Pacific (Osaka-Local)',
      value: 'ap-northeast-3'
    },
    {
      name: 'Asia Pacific (Seoul)',
      value: 'ap-northeast-2'
    },
    {
      name: 'Asia Pacific (Singapore)',
      value: 'ap-southeast-1'
    },
    {
      name: 'Asia Pacific (Sydney)',
      value: 'ap-southeast-2'
    },
    {
      name: 'Asia Pacific (Tokyo)',
      value: 'ap-northeast-1'
    },
    {
      name: 'Canada (Central)',
      value: 'ca-central-1'
    },
    {
      name: 'China (Beijing)',
      value: 'cn-north-1'
    },
    {
      name: 'China (Ningxia)',
      value: 'cn-northwest-1'
    },
    {
      name: 'EU (Frankfurt)',
      value: 'eu-central-1'
    },
    {
      name: 'EU (Ireland)',
      value: 'eu-west-1'
    },
    {
      name: 'EU (London)',
      value: 'eu-west-2'
    },
    {
      name: 'EU (Paris)',
      value: 'eu-west-3'
    },
    {
      name: 'EU (Stockholm)',
      value: 'eu-north-1'
    },
    {
      name: 'Middle East (Bahrain)',
      value: 'me-south-1'
    },
    {
      name: 'South America (Sao Paulo)',
      value: 'sa-east-1'
    }
  ];


  site = new Site();

  constructor(private siteService: SiteService, private router: Router, private sessionManager: SessionManagerService) {
  }

  ngOnInit() {
  }

  create() {
    this.siteService.insert(this.site, () => {
      this.router.navigate(['/superAdmin/dashboard']);
    });
  }
}
