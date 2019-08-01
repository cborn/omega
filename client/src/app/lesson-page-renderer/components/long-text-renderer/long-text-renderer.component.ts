import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-long-text-renderer',
  templateUrl: './long-text-renderer.component.html',
  styleUrls: ['./long-text-renderer.component.css']
})
export class LongTextRendererComponent implements OnInit {

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;


  value;

  constructor(private _ngZone: NgZone) { }

  ngOnInit() {

    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => {
          this.autosize.resizeToFitContent(true);
        });


  }

}
