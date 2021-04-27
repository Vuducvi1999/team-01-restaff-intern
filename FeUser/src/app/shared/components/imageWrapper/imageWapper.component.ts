import { Component, Input } from "@angular/core";
import { ImageModel } from "src/app/lib/data/models/common/image.model";
import {
  ETypeSizeImage,
  TemplateType,
  TypeDisplayImage,
} from "../../data/common/common.model";

@Component({
  selector: "app-image-wapper",
  templateUrl: "./imageWapper.component.html",
  styleUrls: ["./imageWapper.component.scss"],
})
export class ImageWrapperComponent {
  @Input() data: ImageModel;
  templateType = TemplateType.Display;
  typeSizeImage: string = ETypeSizeImage.NORMAL;
}
