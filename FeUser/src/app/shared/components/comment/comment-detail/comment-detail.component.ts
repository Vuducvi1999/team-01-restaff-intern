import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ReturnMessage } from "src/app/lib/data/models";
import { CommentModel } from "src/app/lib/data/models/comments/comment.model";
import { PageModel } from "src/app/lib/data/models/common/page.model";
import { UserModel } from "src/app/lib/data/models/users/user.model";
import { FileService } from "src/app/lib/data/services";
import { UserService } from "src/app/lib/data/services/users/user.service";
import { TypeDisplayImage } from "src/app/shared/data";

@Component({
  selector: "app-comment-detail",
  templateUrl: "./comment-detail.component.html",
  styleUrls: ["comment-detail.component.scss"],
  providers: [UserService],
})
export class CommentDetailComponent implements OnInit {
  @Input() comments: PageModel<CommentModel>;
  @Input() class: string;
  @Output() action = new EventEmitter();
  allUser: ReturnMessage<UserModel>[] = [];
  page = 0;
  public typeDisplayImage = TypeDisplayImage;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    console.log(this.comments);
    this.page = this.comments.pageIndex + 1;
    this.getAllUser();
  }

  getDate(date: string) {
    return new Date(date).toLocaleString();
  }

  getCustomerImage(customerId) {
    const customer: ReturnMessage<UserModel>[] = this.allUser.filter(
      (i) => (i.data.id = customerId)
    );
    return FileService.getLinkFile(customer[0].data.imageUrl);
  }

  async getAllUser() {
    const UserIds = this.comments.results
      .map((i) => i.customerId)
      .filter((i, index, arr) => arr.indexOf(i) == index);

    this.allUser = await Promise.all(
      UserIds.map((i) => this.userService.getUserById(i))
    );
  }

  pageChange(event) {
    this.action.emit(event);
  }
}
