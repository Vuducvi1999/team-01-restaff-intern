import {
  Component,
  OnInit,
  Input,
  HostListener,
  OnDestroy,
} from "@angular/core";
import { Router } from "@angular/router";
import { UserDataReturnDTOModel } from "src/app/lib/data/models/users/user.model";
import { HeaderModel, InfoHeaderModel } from "src/app/lib/data/models";
import {
  AuthService,
  FileService,
  HeaderService,
} from "src/app/lib/data/services";
import { TypeDisplayImage } from "../../data";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header-one",
  templateUrl: "./header-one.component.html",
  styleUrls: ["./header-one.component.scss"],
  providers: [AuthService],
})
export class HeaderOneComponent implements OnInit, OnDestroy {
  @Input() class: string;
  @Input() themeLogo: string = "assets/images/icon/logo.png"; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false
  typeDisplayImage = TypeDisplayImage;
  user: UserDataReturnDTOModel;
  subDataUser: Subscription;

  public headerModel: InfoHeaderModel = {
    informationWeb: { address: "", phone: "", email: "", fax: "", logo: "" },
  };
  public stick: boolean = false;
  loadUrlNavaigate(url: string) {
    this.router.navigateByUrl(url);
  }

  constructor(
    private router: Router,
    public headerService: HeaderService,
    private authService: AuthService
  ) {}
  ngOnDestroy(): void {
    this.subDataUser.unsubscribe();
  }

  ngOnInit(): void {
    this.subDataUser = this.authService.callUserInfo.subscribe(it => this.user = it);
    this.loadHeaderModel();
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (number >= 150 && window.innerWidth > 400) {
      this.stick = true;
    } else {
      this.stick = false;
    }
  }

  onLogout() {
    this.authService.changeUserInfo(null);
    localStorage.removeItem("token");
    this.loadUrlNavaigate("/auth/login");
  }
  async loadHeaderModel() {
    await this.headerService.getInformationWeb(null).then((res: any) => {
      this.headerModel.informationWeb = res.data;
    });
  }
}
