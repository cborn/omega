import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {LessonBuilderComponent} from './lesson-builder/lesson-builder.component';
import {LoginComponent} from './login/login.component';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {Guard, StudentGuard} from './guards/guard';

const routes: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent, canActivate: [StudentGuard]},
    {path: 'lesson/builder/:lessonId', component: LessonBuilderComponent, canActivate: [Guard]},
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
