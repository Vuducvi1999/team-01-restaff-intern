import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { content } from './shared/routes/content-routes';
import { ContentLayoutComponent } from './shared/layout/content-layout/content-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuardsAdminService } from './lib/guards/auth.guard';
import { RouterHelperService } from './lib/helpers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profiles/profile-settings',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: content,
    canActivate: [AuthGuardsAdminService],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
  providers: [AuthGuardsAdminService, RouterHelperService],
})
export class AppRoutingModule {}
