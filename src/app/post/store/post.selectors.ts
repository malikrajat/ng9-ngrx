import { createFeatureSelector, createSelector } from '@ngrx/store';
import { postsFeatureKey, PostState, selectAll } from './post.reducer';
export const loadUPostState = createFeatureSelector<PostState>(postsFeatureKey);

export const loadPostsList = createSelector(loadUPostState, selectAll);
export const selectedPostDetails = createSelector(
  loadUPostState,
  (state: PostState) => state.selectedPost
);

export const hasLoaded = createSelector(
  loadUPostState,
  (state: PostState) => state.hasLoaded
);
