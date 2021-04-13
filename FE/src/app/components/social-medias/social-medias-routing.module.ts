import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSocialMediaComponent } from './create-social-media/create-social-media.component';
import { ListSocialMediaComponent } from './list-social-media/list-social-media.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-social-medias',
        component: ListSocialMediaComponent,
        data: {
          title: 'Social Media List',
          breadcrumb: 'Social Media List',
        },
      },
      {
        path: 'create-social-medias',
        component: CreateSocialMediaComponent,
        data: {
          title: 'Create Social Media',
          breadcrumb: 'Create Social Media',
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
