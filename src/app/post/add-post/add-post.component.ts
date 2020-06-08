import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostState } from '../store/post.reducer';
import { Store } from '@ngrx/store';
import { addPost } from '../store/post.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AddPostComponent implements OnInit {
  addPost: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private _store: Store<PostState>) {}

  ngOnInit(): void {
    this.addPost = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      body: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * addNewPost: void  */
  public addNewPost(): void {
    this.submitted = true;
    if (this.addPost.invalid) {
      return;
    }
    this._store.dispatch(addPost({ post: this.addPost.value }));
  }
  get f() {
    return this.addPost.controls;
  }
}
