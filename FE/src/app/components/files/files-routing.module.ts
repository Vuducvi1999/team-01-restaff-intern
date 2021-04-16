import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSingleImageComponent } from './create-single-image/create-single-image.component';
import { ListFilesComponent } from './list-files/list-files.component';


const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'list-files',
          component: ListFilesComponent,
          data: {
            title: "File List",
            breadcrumb: "File List"
          }
        },
      ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FilesRoutingModule { }