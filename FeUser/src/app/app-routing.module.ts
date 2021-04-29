import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/auth/login/login.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { PagesComponent } from "./components/pages.component";
const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "",
    component: PagesComponent,
    loadChildren: () =>
      import("./components/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "auth",
    component: PagesComponent,
    loadChildren: () =>
      import("./components/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "**", // Navigate to Home Page if not found any page
    redirectTo: "",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabled",
      useHash: false,
      anchorScrolling: "enabled",
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
