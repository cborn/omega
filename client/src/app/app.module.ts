import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LocationStrategy, HashLocationStrategy, ViewportScroller} from '@angular/common';
import {IndexComponent} from './index/index.component';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {NavService} from './nav/nav.service';
import {LessonPageBuilderComponent} from './faculty/lessonPage/lesson-page-builder/lesson-page-builder.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatGridList,
    MatGridListModule, MatListModule, MatMenuModule, MatNativeDateModule,
    MatOptionModule, MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule, MatTabsModule,
    MatToolbarModule, MatTooltipModule
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
import {LessonQuestionComponent} from './faculty/lessonPage/lesson-page-builder/components/lesson-question/lesson-question.component';
import {SidebarComponent} from './faculty/lessonPage/lesson-page-builder/components/sidebar/sidebar.component';
import {
    ClozeDialogComponent,
    ClozeQuestionComponent
} from './faculty/lessonPage/lesson-page-builder/components/lesson-question/cloze-question/cloze-question.component';
import {ClozeFormatPipe} from './pipes/cloze-format.pipe';
import {MultipleSelectComponent} from './faculty/lessonPage/lesson-page-builder/components/lesson-question/multiple-select/multiple-select.component';
import {PositionOrderPipe} from './pipes/position-order.pipe';
import {PictureSelectComponent} from './faculty/lessonPage/lesson-page-builder/components/lesson-question/picture-select/picture-select.component';
import {ImageUrlFilterPipe} from './pipes/image-url-filter.pipe';
import {LessonRendererComponent} from './faculty/lessonPage/lesson-page-renderer/lesson-renderer/lesson-renderer.component';
import {ShortTextRendererComponent} from './faculty/lessonPage/lesson-page-renderer/components/short-text-renderer/short-text-renderer.component';
import {MultiChoiceRendererComponent} from './faculty/lessonPage/lesson-page-renderer/components/multi-choice-renderer/multi-choice-renderer.component';
import {LongTextRendererComponent} from './faculty/lessonPage/lesson-page-renderer/components/long-text-renderer/long-text-renderer.component';
import {BlockTextRendererComponent} from './faculty/lessonPage/lesson-page-renderer/components/block-text-renderer/block-text-renderer.component';
import {PictureChoiceRendererComponent} from './faculty/lessonPage/lesson-page-renderer/components/picture-choice-renderer/picture-choice-renderer.component';
import {BooleanRendererComponent} from './faculty/lessonPage/lesson-page-renderer/components/boolean-renderer/boolean-renderer.component';
import {ScaleRendererComponent} from './faculty/lessonPage/lesson-page-renderer/components/scale-renderer/scale-renderer.component';
import {DateRendererComponent} from './faculty/lessonPage/lesson-page-renderer/components/date-renderer/date-renderer.component';
import {NumberRendererComponent} from './faculty/lessonPage/lesson-page-renderer/components/number-renderer/number-renderer.component';
import {DropdownRendererComponent} from './faculty/lessonPage/lesson-page-renderer/components/dropdown-renderer/dropdown-renderer.component';
import {VoiceRendererComponent} from './faculty/lessonPage/lesson-page-renderer/components/voice-renderer/voice-renderer.component';
import {ClozeRendererComponent} from './faculty/lessonPage/lesson-page-renderer/components/cloze-renderer/cloze-renderer.component';
import {DateFormatPipe} from './pipes/date-format.pipe';
import {AuthenticatedHttpClient, AuthenticatedHttpClientFactory} from './services/authenticated-http-service.service';
import {SessionManagerService} from './services/session-manager.service';
import {Router} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AlertDialogComponent, ConfirmDialogComponent, NotificationService} from './services/notification.service';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {AdminGuard, FacultyGuard, GraderGuard, StudentGuard, SuperAdminGuard} from './guards/guard';
import {CourseIndexComponent} from './faculty/course/index/courseIndex.component';
import {LessonIndexComponent} from './faculty/lesson/index/lessonIndex.component';
import {CourseEditComponent} from './faculty/course/course-edit/course-edit.component';
import {CourseCreateComponent} from './faculty/course/course-create/course-create.component';
import {LessonPageIndexComponent} from './faculty/lessonPage/index/lessonPageIndex.component';
import { LessonEditComponent } from './faculty/lesson/lesson-edit/lesson-edit.component';
import { LessonCreateComponent } from './faculty/lesson/lesson-create/lesson-create.component';
import { SaveStatusComponent } from './faculty/lessonPage/save-status/save-status.component';
import {ClozeFormatRenderPipe} from './pipes/cloze-format-render.pipe';
import { DashboardComponent } from './faculty/admin/dashboard/dashboard.component';
import { TermIndexComponent } from './term/term-index/term-index.component';
import { OTPComponentComponent } from './otpcomponent/otpcomponent.component';
import { PageSelectionComponent } from './student/page-selection/page-selection.component';
import { SubmissionComponent } from './student/submission/submission.component';
import {CommentAddingDialogComponent} from './dialogs/comment-adding-dialog';
import { SubmissionGradeComponent } from './faculty/submission-grade/submission-grade.component';
import {StudentIndexComponent} from './student/index/index.component';
import {FacultyIndexComponent} from './faculty/index/index.component';
import { AnswerGradingRendererComponent } from './faculty/answer-grading-renderer/answer-grading-renderer.component';
import { GradebookComponent } from './faculty/gradebook/gradebook.component';
import {PromptRecordingDialogComponent} from './dialogs/prompt-recording-dialog';
import {CourseSelectionComponent} from './student/course-selection/course-selection.component';
import {RubyProcessorPipe} from './pipes/ruby-processor.pipe';
import {RubyPromptEditDialogComponent} from './dialogs/ruby-edit-dialog';
import { SuperAdminDashboardComponent } from './superAdmin/super-admin-dashboard/super-admin-dashboard.component';
import { SuperAdminSiteCreateComponent } from './superAdmin/super-admin-site-create/super-admin-site-create.component';
import { SuperAdminSiteEditComponent } from './superAdmin/super-admin-site-edit/super-admin-site-edit.component';
import {TermCreateComponent} from './term/term-create/term-create.component';
import { CommentOrderPipe } from './pipes/comment-order.pipe';
import { RandomOrderPipe } from './pipes/random-order.pipe';
import { PitchRenderComponent } from './faculty/lessonPage/lesson-page-renderer/components/voice-renderer/pitch-render/pitch-render.component';

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
        OTPComponentComponent,
        PageSelectionComponent,
        SubmissionComponent,
        CommentAddingDialogComponent,
        SubmissionGradeComponent,
        StudentIndexComponent,
        FacultyIndexComponent,
        AnswerGradingRendererComponent,
        GradebookComponent,
        PromptRecordingDialogComponent,
        CourseSelectionComponent,
        RubyProcessorPipe,
        RubyPromptEditDialogComponent,
        SuperAdminDashboardComponent,
        SuperAdminSiteCreateComponent,
        SuperAdminSiteEditComponent,
        TermCreateComponent,
        CommentOrderPipe,
        RandomOrderPipe,
        PitchRenderComponent
    ],
    entryComponents: [
        ClozeDialogComponent,
        AlertDialogComponent,
        ConfirmDialogComponent,
        CommentAddingDialogComponent,
        PromptRecordingDialogComponent,
        RubyPromptEditDialogComponent
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
        MatProgressSpinnerModule,
        MatNativeDateModule,
        MatTabsModule,
        MatTooltipModule,
        MatMenuModule
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
