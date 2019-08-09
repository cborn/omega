import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LocationStrategy, HashLocationStrategy, ViewportScroller} from '@angular/common';
import {IndexComponent} from './index/index.component';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {NavService} from './nav/nav.service';
import {LessonPageBuilderComponent} from './lessonPage/lesson-page-builder/lesson-page-builder.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatGridList,
    MatGridListModule, MatListModule, MatNativeDateModule,
    MatOptionModule, MatProgressSpinnerModule,
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
import {LessonQuestionComponent} from './lessonPage/lesson-page-builder/components/lesson-question/lesson-question.component';
import {SidebarComponent} from './lessonPage/lesson-page-builder/components/sidebar/sidebar.component';
import {
    ClozeDialogComponent,
    ClozeQuestionComponent
} from './lessonPage/lesson-page-builder/components/lesson-question/cloze-question/cloze-question.component';
import {ClozeFormatPipe} from './pipes/cloze-format.pipe';
import {MultipleSelectComponent} from './lessonPage/lesson-page-builder/components/lesson-question/multiple-select/multiple-select.component';
import {PositionOrderPipe} from './pipes/position-order.pipe';
import {PictureSelectComponent} from './lessonPage/lesson-page-builder/components/lesson-question/picture-select/picture-select.component';
import {ImageUrlFilterPipe} from './pipes/image-url-filter.pipe';
import {LessonRendererComponent} from './lessonPage/lesson-page-renderer/lesson-renderer/lesson-renderer.component';
import {ShortTextRendererComponent} from './lessonPage/lesson-page-renderer/components/short-text-renderer/short-text-renderer.component';
import {MultiChoiceRendererComponent} from './lessonPage/lesson-page-renderer/components/multi-choice-renderer/multi-choice-renderer.component';
import {LongTextRendererComponent} from './lessonPage/lesson-page-renderer/components/long-text-renderer/long-text-renderer.component';
import {BlockTextRendererComponent} from './lessonPage/lesson-page-renderer/components/block-text-renderer/block-text-renderer.component';
import {PictureChoiceRendererComponent} from './lessonPage/lesson-page-renderer/components/picture-choice-renderer/picture-choice-renderer.component';
import {BooleanRendererComponent} from './lessonPage/lesson-page-renderer/components/boolean-renderer/boolean-renderer.component';
import {ScaleRendererComponent} from './lessonPage/lesson-page-renderer/components/scale-renderer/scale-renderer.component';
import {DateRendererComponent} from './lessonPage/lesson-page-renderer/components/date-renderer/date-renderer.component';
import {NumberRendererComponent} from './lessonPage/lesson-page-renderer/components/number-renderer/number-renderer.component';
import {DropdownRendererComponent} from './lessonPage/lesson-page-renderer/components/dropdown-renderer/dropdown-renderer.component';
import {VoiceRendererComponent} from './lessonPage/lesson-page-renderer/components/voice-renderer/voice-renderer.component';
import {ClozeRendererComponent} from './lessonPage/lesson-page-renderer/components/cloze-renderer/cloze-renderer.component';
import {DateFormatPipe} from './pipes/date-format.pipe';
import {AuthenticatedHttpClient, AuthenticatedHttpClientFactory} from './services/authenticated-http-service.service';
import {SessionManagerService} from './services/session-manager.service';
import {Router} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AlertDialogComponent, ConfirmDialogComponent, NotificationService} from './services/notification.service';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {AdminGuard, FacultyGuard, GraderGuard, StudentGuard, SuperAdminGuard} from './guards/guard';
import {CourseIndexComponent} from './course/index/courseIndex.component';
import {LessonIndexComponent} from './lesson/index/lessonIndex.component';
import {CourseEditComponent} from './course/course-edit/course-edit.component';
import {CourseCreateComponent} from './course/course-create/course-create.component';
import {LessonPageIndexComponent} from './lessonPage/index/lessonPageIndex.component';
import { LessonEditComponent } from './lesson/lesson-edit/lesson-edit.component';
import { LessonCreateComponent } from './lesson/lesson-create/lesson-create.component';
import { SaveStatusComponent } from './lessonPage/save-status/save-status.component';
import {ClozeFormatRenderPipe} from './pipes/cloze-format-render.pipe';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { TermIndexComponent } from './term/term-index/term-index.component';
import { OTPComponentComponent } from './otpcomponent/otpcomponent.component';

// @ts-ignore
@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        IndexComponent,
        LessonPageBuilderComponent,
        LessonQuestionComponent,
        SidebarComponent,
        ClozeQuestionComponent,
        ClozeFormatPipe,
        ClozeFormatRenderPipe,
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
        DateFormatPipe,
        LoginComponent,
        AlertDialogComponent,
        UnauthorizedComponent,
        CourseIndexComponent,
        LessonIndexComponent,
        CourseEditComponent,
        CourseCreateComponent,
        ConfirmDialogComponent,
        LessonPageIndexComponent,
        LessonEditComponent,
        LessonCreateComponent,
        SaveStatusComponent,
        DashboardComponent,
        TermIndexComponent,
        OTPComponentComponent
    ],
    entryComponents: [
        ClozeDialogComponent,
        AlertDialogComponent,
        ConfirmDialogComponent
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
        MatProgressSpinnerModule
    ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
        {
            provide: AuthenticatedHttpClient,
            useFactory: AuthenticatedHttpClientFactory,
            deps: [HttpClient, SessionManagerService, Router, NotificationService]
        }, NavService, {
            provide: SuperAdminGuard, useFactory: (router, sessionManager) => {
                return new SuperAdminGuard(sessionManager, router);
            }, deps: [Router, SessionManagerService]
        },
        {
            provide: AdminGuard, useFactory: (router, sessionManager) => {
                return new AdminGuard(sessionManager, router);
            }, deps: [Router, SessionManagerService]
        },
        {
            provide: FacultyGuard, useFactory: (router, sessionManager) => {
                return new FacultyGuard(sessionManager, router);
            }, deps: [Router, SessionManagerService]
        },
        {
            provide: GraderGuard, useFactory: (router, sessionManager) => {
                return new GraderGuard(sessionManager, router);
            }, deps: [Router, SessionManagerService]
        },
        {
            provide: StudentGuard, useFactory: (router, sessionManager) => {
                return new StudentGuard(sessionManager, router);
            }, deps: [Router, SessionManagerService]
        }
        ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
