import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import {BaseRenderComponent} from '../../../../Blueprints/base-render-component';

@Component({
  selector: 'app-long-text-renderer',
  templateUrl: './long-text-renderer.component.html',
  styleUrls: ['./long-text-renderer.component.css']
})
export class LongTextRendererComponent extends BaseRenderComponent implements OnInit {

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;


  value;

  constructor(private _ngZone: NgZone) {
    super();
  }

  ngOnInit() {

    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => {
          this.autosize.resizeToFitContent(true);
        });


  }

  setValue(value) {
    this.value = value;
  }

}
