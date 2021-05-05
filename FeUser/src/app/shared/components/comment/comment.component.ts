import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  CommentModel,
  CommentPassingModel,
} from "src/app/lib/data/models/comments/comment.model";
import { UserDataReturnDTOModel } from "src/app/lib/data/models/users/user.model";
import { CommentService } from "src/app/lib/data/services/comments/comment.service";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  providers: [CommentService],
})
export class CommentComponent implements OnInit {
  commentForm: FormGroup;
  @Input() dataComment: CommentPassingModel;

  constructor(
    private commentService: CommentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.commentForm = this.fb.group({
      fullName: [this.dataComment.fullName],
      customerId: [this.dataComment.customerId],
      entityId: [this.dataComment.entityId],
      entityType: [this.dataComment.entityType],
      content: [""],
    });
  }

  Submit() {
    if (!this.dataComment.customerId) {
      alert("Please login first!");
      return;
    }

    this.commentService
      .create(this.commentForm.value)
      .then((data) => {
        this.initForm();
      })
      .catch((e) => {
        console.log(e);
        alert("Submit fail");
      });
  }
}
