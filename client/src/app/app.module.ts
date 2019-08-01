import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LocationStrategy, HashLocationStrategy, ViewportScroller} from '@angular/common';
import {IndexComponent} from './index/index.component';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {NavService} from './nav/nav.service';
import {LessonBuilderComponent} from './lesson-builder/lesson-builder.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatGridList,
    MatGridListModule, MatListModule, MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { LessonQuestionComponent } from './lesson-builder/components/lesson-question/lesson-question.component';
import { SidebarComponent } from './lesson-builder/components/sidebar/sidebar.component';
import {
    ClozeDialogComponent,
    ClozeQuestionComponent
} from './lesson-builder/components/lesson-question/cloze-question/cloze-question.component';
import { ClozeFormatPipe } from './pipes/cloze-format.pipe';
import { MultipleSelectComponent } from './lesson-builder/components/lesson-question/multiple-select/multiple-select.component';
import { PositionOrderPipe } from './pipes/position-order.pipe';
import { PictureSelectComponent } from './lesson-builder/components/lesson-question/picture-select/picture-select.component';
import { ImageUrlFilterPipe } from './pipes/image-url-filter.pipe';
import { LessonRendererComponent } from './lesson-page-renderer/lesson-renderer/lesson-renderer.component';
import { ShortTextRendererComponent } from './lesson-page-renderer/components/short-text-renderer/short-text-renderer.component';
import { MultiChoiceRendererComponent } from './lesson-page-renderer/components/multi-choice-renderer/multi-choice-renderer.component';
import { LongTextRendererComponent } from './lesson-page-renderer/components/long-text-renderer/long-text-renderer.component';
import { BlockTextRendererComponent } from './lesson-page-renderer/components/block-text-renderer/block-text-renderer.component';
import { PictureChoiceRendererComponent } from './lesson-page-renderer/components/picture-choice-renderer/picture-choice-renderer.component';
import { BooleanRendererComponent } from './lesson-page-renderer/components/boolean-renderer/boolean-renderer.component';
import { ScaleRendererComponent } from './lesson-page-renderer/components/scale-renderer/scale-renderer.component';
import { DateRendererComponent } from './lesson-page-renderer/components/date-renderer/date-renderer.component';
import { NumberRendererComponent } from './lesson-page-renderer/components/number-renderer/number-renderer.component';
import { DropdownRendererComponent } from './lesson-page-renderer/components/dropdown-renderer/dropdown-renderer.component';
import { VoiceRendererComponent } from './lesson-page-renderer/components/voice-renderer/voice-renderer.component';
import { ClozeRendererComponent } from './lesson-page-renderer/components/cloze-renderer/cloze-renderer.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

// @ts-ignore
@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        IndexComponent,
        LessonBuilderComponent,
        LessonQuestionComponent,
        SidebarComponent,
        ClozeQuestionComponent,
        ClozeFormatPipe,
        ClozeDialogComponent,
        MultipleSelectComponent,
        PositionOrderPipe,
        PictureSelectComponent,
        ImageUrlFilterPipe,
        LessonRendererComponent,
        ShortTextRendererComponent,
        MultiChoiceRendererComponent,
        LongTextRendererComponent,
        BlockTextRendererComponent,
        PictureChoiceRendererComponent,
        BooleanRendererComponent,
        ScaleRendererComponent,
        DateRendererComponent,
        NumberRendererComponent,
        DropdownRendererComponent,
        VoiceRendererComponent,
        ClozeRendererComponent,
        DateFormatPipe
    ],
    entryComponents : [
        ClozeDialogComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatRadioModule,
        MatDialogModule,
        MatChipsModule,
        MatBadgeModule,
        MatSlideToggleModule,
        MatIconModule,
        MatSnackBarModule,
        MatCardModule,
        MatSidenavModule,
        MatGridListModule,
        MatToolbarModule,
        MatOptionModule,
        MatSelectModule,
        MatListModule,
        MatNativeDateModule,
        MatMomentDateModule
    ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, NavService, ViewportScroller],
    bootstrap: [AppComponent]
})
export class AppModule {
}
