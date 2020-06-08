import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../store/post.model';
import { Store, select } from '@ngrx/store';
import { PostState } from '../store/post.reducer';
import * as fromSelecter from '../store/post.selectors';
import * as fromAction from '../store/post.actions';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>;
  constructor(private _store: Store<PostState>) {}

  ngOnInit(): void {
    this._loadPosts();
  }

  private _loadPosts(): void {
    this._store.pipe(select(fromSelecter.hasLoaded)).subscribe((res) => {
      if (res) {
        this.posts$ = this._store.pipe(select(fromSelecter.loadPostsList));
      } else {
        this._store.dispatch(fromAction.loadPosts());
      }
    });
  }
  /**
   * deletePost: void  */
  public deletePost(id: string): void {
    if (window.confirm('Are sure you want to delete this item ?')) {
      this._store.dispatch(fromAction.deletePost({ id }));
    }
  }
}
