import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, usersFeatureKey, selectAll } from './user.reducer';

export const loadUserState = createFeatureSelector<UserState>(usersFeatureKey);

export const loadUsersList = createSelector(loadUserState, selectAll);

export const selectedUserDetails = createSelector(
  loadUserState,
  (state: UserState) => state.selectedUser
);

export const hasLoaded = createSelector(
  loadUserState,
  (state: UserState) => state.hasLoaded
);
