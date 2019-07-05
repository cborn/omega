import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
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
    MatGridListModule,
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

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        IndexComponent,
        LessonBuilderComponent,
        LessonQuestionComponent,
        SidebarComponent
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
        MatSelectModule
    ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, NavService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
