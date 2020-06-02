import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  declarations: [AddPostComponent, EditPostComponent, PostListComponent],
  imports: [CommonModule, PostRoutingModule],
})
export class PostModule {}
