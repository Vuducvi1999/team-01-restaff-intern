import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSocialMediaComponent } from './list-social-media/list-social-media.component';
import { SocialMediaDetailComponent } from './social-media-detail/social-media-detail.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialMediasRoutingModule {}
