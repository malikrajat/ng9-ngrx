import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Post } from './post.model';
import * as PostActions from './post.actions';

export const postsFeatureKey = 'posts';

export interface PostState extends EntityState<Post> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export const initialState: PostState = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(PostActions.addPost, (state, action) =>
    adapter.addOne(action.post, state)
  ),
  on(PostActions.upsertPost, (state, action) =>
    adapter.upsertOne(action.post, state)
  ),
  on(PostActions.addPosts, (state, action) =>
    adapter.addMany(action.posts, state)
  ),
  on(PostActions.upsertPosts, (state, action) =>
    adapter.upsertMany(action.posts, state)
  ),
  on(PostActions.updatePost, (state, action) =>
    adapter.updateOne(action.post, state)
  ),
  on(PostActions.updatePosts, (state, action) =>
    adapter.updateMany(action.posts, state)
  ),
  on(PostActions.deletePost, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(PostActions.deletePosts, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(PostActions.loadPosts, (state, action) =>
    adapter.setAll(action.posts, state)
  ),
  on(PostActions.clearPosts, (state) => adapter.removeAll(state))
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
