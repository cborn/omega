import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {LessonPageBuilderComponent} from './lessonPage/lesson-page-builder/lesson-page-builder.component';
import {LoginComponent} from './login/login.component';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {AdminGuard, FacultyGuard, StudentGuard} from './guards/guard';
import {CourseIndexComponent} from './course/index/courseIndex.component';
import {LessonIndexComponent} from './lesson/index/lessonIndex.component';
import {CourseEditComponent} from './course/course-edit/course-edit.component';
import {CourseCreateComponent} from './course/course-create/course-create.component';
import {LessonPageIndexComponent} from './lessonPage/index/lessonPageIndex.component';
import {LessonCreateComponent} from './lesson/lesson-create/lesson-create.component';
import {LessonEditComponent} from './lesson/lesson-edit/lesson-edit.component';
import {TermIndexComponent} from './term/term-index/term-index.component';
import {OTPComponentComponent} from './otpcomponent/otpcomponent.component';
import {PageSelectionComponent} from './student/page-selection/page-selection.component';
import {SubmissionComponent} from './student/submission/submission.component';

const routes: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent, canActivate: [StudentGuard]},
    {path: 'lessonPage/builder/:lessonId', component: LessonPageBuilderComponent, canActivate: [FacultyGuard]},

    {path: 'term/index', component: TermIndexComponent, canActivate: [AdminGuard]},
    // {path: 'term/edit/:termId', component: CourseEditComponent, canActivate: [FacultyGuard]},
    // {path: 'term/create', component: CourseCreateComponent, canActivate: [FacultyGuard]},


    {path: 'course/index', component: CourseIndexComponent, canActivate: [StudentGuard]},
    {path: 'course/edit/:courseId', component: CourseEditComponent, canActivate: [FacultyGuard]},
    {path: 'course/create', component: CourseCreateComponent, canActivate: [FacultyGuard]},

    {path: 'lesson/index/:courseId', component: LessonIndexComponent, canActivate: [StudentGuard]},
    {path: 'lesson/edit/:lessonId', component: LessonEditComponent, canActivate: [FacultyGuard]},
    {path: 'lesson/create', component: LessonCreateComponent, canActivate: [FacultyGuard]},

    {path: 'admin/dashboard', component: LessonCreateComponent, canActivate: [AdminGuard]},


    // Student services.

    {path: 'student/lesson/:lessonId', component: PageSelectionComponent, canActivate: [StudentGuard]},
    {path: 'student/submission/:submissionId', component: SubmissionComponent, canActivate: [StudentGuard]},


    {path: 'lessonPage/index/:lessonId', component: LessonPageIndexComponent, canActivate: [StudentGuard]},
    // {path: 'lessonPage/edit/:lessonPageId', component: CourseEditComponent, canActivate: [StudentGuard]},
    // {path: 'lessonPage/create', component: CourseCreateComponent, canActivate: [StudentGuard]},

    // Anyone can access these

    {path: 'otp', component: OTPComponentComponent},
    {path: 'login', component: LoginComponent},
    {path: 'unauthorized', component: UnauthorizedComponent}

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
