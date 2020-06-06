import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from './user.model';
import * as UserActions from './user.actions';

export const usersFeatureKey = 'users';

export interface UserState extends EntityState<User> {
  // additional entities state properties
  error: any;
  selectedUser: User;
  hasLoaded: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UserState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedUser: undefined,
  hasLoaded: false,
});

const _userReducer = createReducer(
  initialState,
  // Load Single Users
  on(UserActions.loadUserSuccess, (state, action) => {
    return {
      ...state,
      selectedUser: action.selectedUser,
    };
  }),
  on(UserActions.loadUsersFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  // load users
  on(UserActions.loadUsersSuccess, (state, action) =>
    // adapter.addAll(action.users, state)
    adapter.addAll(action.users, {
      ...state,
      hasLoaded: true,
    })
  ),
  on(UserActions.loadUsersFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      hasLoaded: true,
    };
  }),
  // add user
  on(UserActions.addUserSuccess, (state, action) =>
    adapter.addOne(action.user, state)
  ),
  on(UserActions.addUsersFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // delete user
  on(UserActions.deleteUserSuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(UserActions.deleteUsersFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  // edit user
  on(UserActions.editUserSuccess, (state, action) =>
    adapter.updateOne(action.user, state)
  ),
  on(UserActions.editUsersFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);

export function reducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
