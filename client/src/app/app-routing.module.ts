import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {LessonPageBuilderComponent} from './lessonPage/lesson-page-builder/lesson-page-builder.component';
import {LoginComponent} from './login/login.component';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {FacultyGuard, StudentGuard} from './guards/guard';
import {CourseIndexComponent} from './course/index/courseIndex.component';
import {LessonIndexComponent} from './lesson/index/lessonIndex.component';
import {CourseEditComponent} from './course/course-edit/course-edit.component';
import {CourseCreateComponent} from './course/course-create/course-create.component';
import {LessonPageIndexComponent} from './lessonPage/index/lessonPageIndex.component';

const routes: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent, canActivate: [StudentGuard]},
    {path: 'lessonPage/builder/:lessonId', component: LessonPageBuilderComponent, canActivate: [FacultyGuard]},
    {path: 'course/index', component: CourseIndexComponent, canActivate: [StudentGuard]},
    {path: 'course/edit/:courseId', component: CourseEditComponent, canActivate: [StudentGuard]},
    {path: 'course/create', component: CourseCreateComponent, canActivate: [StudentGuard]},

    {path: 'lesson/index/:courseId', component: LessonIndexComponent, canActivate: [StudentGuard]},
    {path: 'lessonPage/index/:lessonId', component: LessonPageIndexComponent, canActivate: [StudentGuard]},

    // Anyone can access these
    {path: 'login', component: LoginComponent},
    {path: 'unauthorized', component: UnauthorizedComponent}

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
