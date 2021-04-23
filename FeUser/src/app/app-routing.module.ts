import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
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
    loadChildren: () => import("./components/pages.module").then((m) => m.PagesModule),
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
