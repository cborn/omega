import {Component, OnInit} from '@angular/core';
import {Site} from '../../Model/site';
import {SiteService} from '../../services/site.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PERMISSION_ROLE, SessionManagerService} from '../../services/session-manager.service';

@Component({
  selector: 'app-super-admin-site-edit',
  templateUrl: './super-admin-site-edit.component.html',
  styleUrls: ['./super-admin-site-edit.component.css']
})
export class SuperAdminSiteEditComponent implements OnInit {

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


  site: Site;

  constructor(private siteService: SiteService, private router: Router, private route: ActivatedRoute, private sessionManager: SessionManagerService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async value => {
      this.siteService.get(value.get('siteId'), (data) => {
        this.site = data;
      }, false);
    });
  }

  save() {
    this.siteService.update(this.site.id, this.site, () => {
      if(this.sessionManager.checkRoles(PERMISSION_ROLE.ROLE_SUPER_ADMIN)) {
        this.router.navigate(['/superAdmin/dashboard']);
      } else {
        this.router.navigate(['/faculty/index']);
      }


    });
  }

}
