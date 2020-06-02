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
