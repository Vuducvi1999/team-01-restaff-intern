import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CommentPassingModel } from "src/app/lib/data/models/comments/comment.model";
import { CommentService } from "src/app/lib/data/services/comments/comment.service";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  providers: [CommentService],
  styles: [
    `
      .star {
        position: relative;
        display: inline-block;
        font-size: 2rem;
        color: #b0c4de;
      }
      .filled {
        color: #1e90ff;
      }
      .half {
        position: absolute;
        display: inline-block;
        overflow: hidden;
        color: #1e90ff;
      }
    `,
  ],
})
export class CommentComponent implements OnInit {
  commentForm: FormGroup;
  @Input() dataComment: CommentPassingModel;
  @Output() action = new EventEmitter();

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
      rating: [this.dataComment.rating],
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
        this.action.emit();
      })
      .catch((e) => {
        console.log(e);
        alert("Submit fail");
      });
  }
}
