import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSocialMediasComponent } from './create-socialmedias/create-socialmedias.component';
import { ListSocialMediasComponent } from './list-socialmedias/list-socialmedias.component';
import { UpdateSocialMediasComponent } from './update-socialmedias/update-socialmedias.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-social-medias',
        component: ListSocialMediasComponent,
        data: {
          title: 'Social Media List',
          breadcrumb: 'Social Media List',
        },
      },
      {
        path: 'create-social-medias',
        component: CreateSocialMediasComponent,
        data: {
          title: 'Create Social Media',
          breadcrumb: 'Create Social Media',
        },
      },
      {
        path: 'update-social-medias',
        component: UpdateSocialMediasComponent,
        data: {
          title: 'Update Social Media',
          breadcrumb: 'Update Social Media',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialMediasRoutingModule {}
