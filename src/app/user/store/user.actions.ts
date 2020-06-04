import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { User } from './user.model';

//Load Single User
export const loadUser = createAction(
  '[User Edit component] Load User',
  props<{ id: string | number }>()
);
export const loadUserSuccess = createAction(
  '[User List Effects] Load User success',
  props<{ selectedUser: User }>()
);
export const loadUserFailure = createAction(
  '[User List Effect] Load User Failure',
  props<{ error: any }>()
);

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
  '[Add User component] add new user',
  props<{ user: User }>()
);
export const addUserSuccess = createAction(
  '[Add User  Effects] Add User success',
  props<{ user: User }>()
);
export const addUsersFailure = createAction(
  '[Add User  Effect] Add User Failure',
  props<{ error: any }>()
);

// delete users
export const deleteUser = createAction(
  '[ User List component] Delete user',
  props<{ id: string }>()
);
export const deleteUserSuccess = createAction(
  '[Delete User  Effects] Delete User success',
  props<{ id: string }>()
);
export const deleteUsersFailure = createAction(
  '[Delete User  Effect] Delete User Failure',
  props<{ error: any }>()
);

// edit user
export const editUser = createAction(
  '[Edit User component] Edit  user',
  props<{ user: Update<User> }>()
);
export const editUserSuccess = createAction(
  '[Edit User  Effects] Edit User success',
  props<{ user: Update<User> }>()
);
export const editUsersFailure = createAction(
  '[Edit User  Effect] Edit User Failure',
  props<{ error: any }>()
);
