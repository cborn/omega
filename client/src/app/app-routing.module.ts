import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {LessonBuilderComponent} from './lesson-builder/lesson-builder.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent},
    {path: 'lesson/builder/:lessonId', component: LessonBuilderComponent},
    {path: 'login', component: LoginComponent}


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
