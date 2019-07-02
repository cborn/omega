import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {LessonBuilderComponent} from './lesson-builder/lesson-builder.component';

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent},
  {path: 'lesson/builder', component: LessonBuilderComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
