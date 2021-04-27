import { Component, OnInit, Input } from "@angular/core";
import { BannerModel } from "src/app/lib/data/models/banners/banner.model";
import { FileService } from "src/app/lib/data/services";
import { HomeSlider } from "src/app/shared/data/slider";

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"],
})
export class SliderComponent implements OnInit {
  @Input() sliders: BannerModel[];
  @Input() class: string;
  @Input() textClass: string;
  @Input() category: string;
  @Input() buttonText: string;
  @Input() buttonClass: string;

  constructor() {}

  ngOnInit(): void {}

  public HomeSliderConfig: any = HomeSlider;

  getImage(image: string) {
    return FileService.getLinkFile(image);
  }
}
