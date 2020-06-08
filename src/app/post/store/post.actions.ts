import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Post } from './post.model';

// loadPosts
export const loadPosts = createAction('[Post List Component] Load Posts');
export const loadPostsSuccess = createAction(
  '[Post Effect ] Load Posts success',
  props<{ posts: Post[] }>()
);
export const loadPostsFail = createAction(
  '[Post Effect ] Load Posts Fail',
  props<{ error: any }>()
);

// delete users
export const deletePost = createAction(
  '[ Post List component] Delete post',
  props<{ id: string }>()
);
export const deletePostSuccess = createAction(
  '[Delete Post  Effects] Delete Post success',
  props<{ id: string }>()
);
export const deletePostFailure = createAction(
  '[Delete Post Effect] Delete Post Failure',
  props<{ error: any }>()
);

//Load Single Post
export const loadPost = createAction(
  '[Post Edit component] Load Post',
  props<{ id: string | number }>()
);
export const loadPostSuccess = createAction(
  '[Post List Effects] Load Post success',
  props<{ selectedPost: Post }>()
);
export const loadPostFailure = createAction(
  '[Post List Effect] Load Post Failure',
  props<{ error: any }>()
);

// add Post
export const addPost = createAction(
  '[Add Post component] add new post',
  props<{ post: Post }>()
);
export const addPostSuccess = createAction(
  '[Add Post  Effects] Add Post success',
  props<{ post: Post }>()
);
export const addPostFailure = createAction(
  '[Add Post  Effect] Add Post Failure',
  props<{ error: any }>()
);

// edit user
export const editPost = createAction(
  '[Edit Post component] Edit post',
  props<{ post: Update<Post> }>()
);
export const editPostSuccess = createAction(
  '[Edit Post  Effects] Edit Post success',
  props<{ post: Update<Post> }>()
);
export const editPostFailure = createAction(
  '[Edit Post  Effect] Edit Post Failure',
  props<{ error: any }>()
);

// export const addPost = createAction(
//   '[Post/API] Add Post',
//   props<{ post: Post }>()
// );

// export const upsertPost = createAction(
//   '[Post/API] Upsert Post',
//   props<{ post: Post }>()
// );

// export const addPosts = createAction(
//   '[Post/API] Add Posts',
//   props<{ posts: Post[] }>()
// );

// export const upsertPosts = createAction(
//   '[Post/API] Upsert Posts',
//   props<{ posts: Post[] }>()
// );

// export const updatePost = createAction(
//   '[Post/API] Update Post',
//   props<{ post: Update<Post> }>()
// );

// export const updatePosts = createAction(
//   '[Post/API] Update Posts',
//   props<{ posts: Update<Post>[] }>()
// );

// export const deletePost = createAction(
//   '[Post/API] Delete Post',
//   props<{ id: string }>()
// );

// export const deletePosts = createAction(
//   '[Post/API] Delete Posts',
//   props<{ ids: string[] }>()
// );

export const clearPosts = createAction('[Post/API] Clear Posts');
