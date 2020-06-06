import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../store/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post>;
  constructor() {}

  ngOnInit(): void {}
  /**
   * deletePost: void  */
  public deletePost(id: string): void {}
}
