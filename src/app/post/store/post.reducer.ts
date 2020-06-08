import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Post } from './post.model';
import * as PostActions from './post.actions';

export const postsFeatureKey = 'posts';

export interface PostState extends EntityState<Post> {
  // additional entities state properties
  error: any;
  hasLoaded: boolean;
  selectedPost: Post;
}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export const initialState: PostState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  hasLoaded: undefined,
  selectedPost: undefined,
});

export const reducer = createReducer(
  initialState,

  // load posts
  on(PostActions.loadPostsSuccess, (state, action) =>
    adapter.addAll(action.posts, {
      ...state,
      hasLoaded: true,
    })
  ),
  on(PostActions.loadPostsFail, (state, action) => {
    return {
      ...state,
      error: action.error,
      hasLoaded: true,
    };
  }),

  // delete post
  on(PostActions.deletePostSuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(PostActions.deletePostFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  // add post
  on(PostActions.addPostSuccess, (state, action) =>
    adapter.addOne(action.post, state)
  ),
  on(PostActions.addPostFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  // Load Single post
  on(PostActions.loadPostSuccess, (state, action) => {
    return {
      ...state,
      selectedPost: action.selectedPost,
    };
  }),
  on(PostActions.loadPostFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  // edit post
  on(PostActions.editPostSuccess, (state, action) =>
    adapter.updateOne(action.post, state)
  ),
  on(PostActions.editPostFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  // on(PostActions.addPost, (state, action) =>
  //   adapter.addOne(action.post, state)
  // ),
  // on(PostActions.upsertPost, (state, action) =>
  //   adapter.upsertOne(action.post, state)
  // ),
  // on(PostActions.addPosts, (state, action) =>
  //   adapter.addMany(action.posts, state)
  // ),
  // on(PostActions.upsertPosts, (state, action) =>
  //   adapter.upsertMany(action.posts, state)
  // ),
  // on(PostActions.updatePost, (state, action) =>
  //   adapter.updateOne(action.post, state)
  // ),
  // on(PostActions.updatePosts, (state, action) =>
  //   adapter.updateMany(action.posts, state)
  // ),
  // on(PostActions.deletePost, (state, action) =>
  //   adapter.removeOne(action.id, state)
  // ),
  // on(PostActions.deletePosts, (state, action) =>
  //   adapter.removeMany(action.ids, state)
  // ),
  on(PostActions.clearPosts, (state) => adapter.removeAll(state))
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
