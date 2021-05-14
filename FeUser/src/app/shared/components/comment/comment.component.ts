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
        font-size: 2rem;
        color: #b0c4de;
      }
      .filled {
        color: #ffa200;
      }
      .checkLogin {
        font-size: 1rem;
        font-style: italic;
        margin: 0;
      }
      .review {
        font-size: 1.4rem;
      }
    `,
  ],
})
export class CommentComponent implements OnInit {
  commentForm: FormGroup;
  @Input() dataComment: CommentPassingModel;
  @Input() isLoading: boolean;
  @Output() action = new EventEmitter();

  constructor(
    private commentService: CommentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }
  currentRate = 1;
  initForm() {
    this.commentForm = this.fb.group({
      fullName: [this.dataComment.fullName],
      customerId: [this.dataComment.customerId],
      entityId: [this.dataComment.entityId],
      entityType: [this.dataComment.entityType],
      content: [""],
      rating: [this.dataComment.rating],
    });
    var a = 1;
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
