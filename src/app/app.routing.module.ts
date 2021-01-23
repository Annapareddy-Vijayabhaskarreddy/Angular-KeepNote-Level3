
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListViewComponent } from './list-view/list-view.component';

import { LoginComponent } from './login/login.component';
import { NoteViewComponent } from './note-view/note-view.component';

const routes: Routes = [{
    path:'',component:LoginComponent
  },
  {path:'login',component:LoginComponent},
  {path:'dashboard/view/noteview',component:NoteViewComponent},
  {path:'dashboard/view/listview', component:ListViewComponent}
  ];
  
  


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }