import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CreateCommentModel } from "src/app/lib/data/models/comments/comment.model";
import { MessageService } from "src/app/lib/data/services";
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
  @Input() dataComment: CreateCommentModel;
  @Input() isLoading: boolean;
  @Output() action = new EventEmitter();
  currentRate = 1;

  constructor(
    private commentService: CommentService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.commentForm = this.fb.group({
      entityId: [this.dataComment.entityId],
      entityType: [this.dataComment.entityType],
      content: [""],
      rating: [this.dataComment.rating],
    });
  }

  Submit() {
    this.commentService
      .create(this.commentForm.value)
      .then((data) => {
        this.initForm();
        this.action.emit();
      })
      .catch((e) => {
        this.messageService.alert(e.error.message);
      });
  }
}
