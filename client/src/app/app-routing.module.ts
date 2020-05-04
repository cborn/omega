import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {LessonPageBuilderComponent} from './faculty/lessonPage/lesson-page-builder/lesson-page-builder.component';
import {LoginComponent} from './login/login.component';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {AdminGuard, FacultyGuard, GraderGuard, StudentGuard, SuperAdminGuard} from './guards/guard';
import {CourseIndexComponent} from './faculty/course/index/courseIndex.component';
import {LessonIndexComponent} from './faculty/lesson/index/lessonIndex.component';
import {CourseEditComponent} from './faculty/course/course-edit/course-edit.component';
import {CourseCreateComponent} from './faculty/course/course-create/course-create.component';
import {LessonPageIndexComponent} from './faculty/lessonPage/index/lessonPageIndex.component';
import {LessonCreateComponent} from './faculty/lesson/lesson-create/lesson-create.component';
import {LessonEditComponent} from './faculty/lesson/lesson-edit/lesson-edit.component';
import {TermIndexComponent} from './term/term-index/term-index.component';
import {OTPComponentComponent} from './otpcomponent/otpcomponent.component';
import {PageSelectionComponent} from './student/page-selection/page-selection.component';
import {SubmissionComponent} from './student/submission/submission.component';
import {StudentIndexComponent} from './student/index/index.component';
import {FacultyIndexComponent} from './faculty/index/index.component';
import {SubmissionGradeComponent} from './faculty/submission-grade/submission-grade.component';
import {GradebookComponent} from './faculty/gradebook/gradebook.component';
import {CourseSelectionComponent} from './student/course-selection/course-selection.component';
import {SuperAdminDashboardComponent} from './superAdmin/super-admin-dashboard/super-admin-dashboard.component';
import {SuperAdminSiteCreateComponent} from './superAdmin/super-admin-site-create/super-admin-site-create.component';
import {SuperAdminSiteEditComponent} from './superAdmin/super-admin-site-edit/super-admin-site-edit.component';
import {TermCreateComponent} from './term/term-create/term-create.component';
import {TermEditComponent} from './term/term-edit/term-edit.component';
import {SuperAdminUserCreateComponent} from './superAdmin/super-admin-user-create/super-admin-user-create.component';
import {SuperAdminUserEditComponent} from './superAdmin/super-admin-user-edit/super-admin-user-edit.component';
import {UserIndexComponent} from './faculty/users/index/user-index.component';
import {UserCreateComponent} from './faculty/users/user-create/user-create.component';
import {UserEditComponent} from './faculty/users/user-edit/user-edit.component';
import {SuperAdminAlertCreateComponent} from './superAdmin/super-admin-alert-create/super-admin-alert-create.component';

const routes: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent, canActivate: [StudentGuard]},
    {path: 'lessonPage/builder/:lessonId', component: LessonPageBuilderComponent, canActivate: [FacultyGuard]},

    {path: 'term/index', component: TermIndexComponent, canActivate: [AdminGuard]},
    {path: 'term/edit/:termId', component: TermEditComponent, canActivate: [AdminGuard]},
    {path: 'term/create', component: TermCreateComponent, canActivate: [AdminGuard]},


    {path: 'course/index', component: CourseIndexComponent, canActivate: [FacultyGuard]},
    {path: 'course/edit/:courseId', component: CourseEditComponent, canActivate: [FacultyGuard]},
    {path: 'course/create', component: CourseCreateComponent, canActivate: [FacultyGuard]},

    {path: 'lesson/index/:courseId', component: LessonIndexComponent, canActivate: [GraderGuard]},
    {path: 'lesson/edit/:lessonId', component: LessonEditComponent, canActivate: [FacultyGuard]},
    {path: 'lesson/create', component: LessonCreateComponent, canActivate: [FacultyGuard]},

    {path: 'admin/dashboard', component: LessonCreateComponent, canActivate: [AdminGuard]},


    // Student services.
    {path: 'student/index', component: StudentIndexComponent, canActivate: [StudentGuard]},
    {path: 'student/lesson/:lessonId', component: PageSelectionComponent, canActivate: [StudentGuard]},
    {path: 'student/course/:courseId', component: CourseSelectionComponent, canActivate: [StudentGuard]},
    {path: 'student/course', component: CourseIndexComponent, canActivate: [StudentGuard]},


    {path: 'student/submission/:submissionId', component: SubmissionComponent, canActivate: [StudentGuard]},

    // Faculty Services.
    {path: 'faculty/index', component: FacultyIndexComponent, canActivate: [GraderGuard]},
    {path: 'faculty/grade/:submissionId', component: SubmissionGradeComponent, canActivate: [GraderGuard]},
    {path: 'faculty/gradebook/:lessonId', component: GradebookComponent, canActivate: [GraderGuard]},


    // SuperAdmin
    {path: 'superAdmin/dashboard', component: SuperAdminDashboardComponent, canActivate: [SuperAdminGuard]},

    {path: 'superAdmin/site/create', component: SuperAdminSiteCreateComponent, canActivate: [SuperAdminGuard]},
    {path: 'superAdmin/site/edit/:siteId', component: SuperAdminSiteEditComponent, canActivate: [SuperAdminGuard]},

    {path: 'superAdmin/user/create', component: SuperAdminUserCreateComponent, canActivate: [SuperAdminGuard]},
    {path: 'superAdmin/user/edit/:userId', component: SuperAdminUserEditComponent, canActivate: [SuperAdminGuard]},

    {path: 'superAdmin/alert/create', component: SuperAdminAlertCreateComponent, canActivate: [SuperAdminGuard]},


    {path: 'user/index', component: UserIndexComponent, canActivate: [FacultyGuard]},
    {path: 'user/edit/:userId', component: UserEditComponent, canActivate: [FacultyGuard]},
    {path: 'user/create', component: UserCreateComponent, canActivate: [FacultyGuard]},




    {path: 'lessonPage/index/:lessonId', component: LessonPageIndexComponent, canActivate: [FacultyGuard]},
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
