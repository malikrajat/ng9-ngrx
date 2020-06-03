import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from './user.model';
import * as UserActions from './user.actions';

export const usersFeatureKey = 'users';

export interface UserState extends EntityState<User> {
  // additional entities state properties
  error: any;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UserState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
});

const _userReducer = createReducer(
  initialState,
  // load users
  on(UserActions.loadUsersSuccess, (state, action) =>
    adapter.addAll(action.users, state)
  ),
  on(UserActions.loadUsersFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
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
