import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostState } from '../store/post.reducer';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Update } from '@ngrx/entity';
import { Post, PostModel } from '../store/post.model';
import { loadPost } from '../store/post.actions';
import { editPost } from '../store/post.actions';
import { selectedPostDetails } from '../store/post.selectors';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class EditPostComponent implements OnInit {
  editPost: FormGroup;
  submitted = false;
  postToEdit: Post;
  constructor(
    private fb: FormBuilder,
    private _store: Store<PostState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initEditForm();
    this._store.dispatch(
      loadPost({ id: this.route.snapshot.paramMap.get('id') })
    );
    // load user from store
    this._store.select(selectedPostDetails).subscribe((post) => {
      this.postToEdit = Object.assign(new PostModel(), post);
      const dataPost = this.postToEdit;
      if (Object.keys(dataPost).length > 2) {
        this.loadDateToEditForm(dataPost);
      }
    });
  }
  // init edit form
  private initEditForm() {
    this.editPost = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      body: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  //set data to form
  private loadDateToEditForm(Post) {
    this.editPost.patchValue({
      title: Post.title,
      body: Post.body,
    });
  }
  //update user
  updatePost() {
    this.submitted = true;
    if (this.editPost.invalid) {
      return;
    }
    const update: Update<PostModel> = {
      id: this.postToEdit.id,
      changes: this.editPost.value,
    };
    this._store.dispatch(editPost({ post: update }));
  }

  // get form error
  get f() {
    return this.editPost.controls;
  }
}
