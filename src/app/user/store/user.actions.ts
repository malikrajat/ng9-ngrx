import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { User } from './user.model';

// load users
export const loadUsers = createAction('[User List component] Load Users');
export const loadUsersSuccess = createAction(
  '[User List Effects] Load Users success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[User List Effect] Load Users Failure',
  props<{ error: any }>()
);

// add users
export const addUser = createAction(
  '[Add User component] add new users',
  props<{ user: User }>()
);
export const addUserSuccess = createAction(
  '[Add User  Effects] Add Users success',
  props<{ user: User }>()
);
export const addUsersFailure = createAction(
  '[Add User  Effect] Add Users Failure',
  props<{ error: any }>()
);
