import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  addUser,
  addUserSuccess,
  addUsersFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUsersFailure,
  editUser,
  editUserSuccess,
  loadUser,
  loadUserSuccess,
  loadUserFailure,
} from './user.actions';
import {
  mergeMap,
  map,
  catchError,
  tap,
  concatMap,
  withLatestFrom,
  switchMap,
} from 'rxjs/operators';
import { UserService } from '../user.service';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';
import { Store, Action, select } from '@ngrx/store';
import { UserState } from './user.reducer';
import { loadUsersList } from './user.selectors';
import { Observable, empty } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private _store: Store<UserState>,
    private router: Router
  ) {}

  // load users
  //   loadCollection$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(loadUsers),
  //       withLatestFrom(this._store.pipe(select(loadUsersList))),
  //       switchMap(([, loaded]) => {
  //         if (loaded) {
  //           return empty();
  //         }
  //         return this.userService.getUsers().pipe(
  //           map((users) => {
  //             return loadUsersSuccess({ users });
  //           }),
  //           catchError((error) => of(loadUsersFailure({ error })))
  //         );
  //       })
  //     )
  //   );

  //load usre
  user$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      mergeMap((actions) =>
        this.userService.getUser(actions.id).pipe(
          map((user) => loadUserSuccess({ selectedUser: user })),
          catchError((error) => of(loadUserFailure({ error })))
        )
      )
    )
  );

  //   load users
  users$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );

  //addUser
  addUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      mergeMap((actions) =>
        this.userService.addUser(actions.user).pipe(
          map((user) => addUserSuccess({ user })),
          catchError((error) => of(addUsersFailure({ error })))
        )
      ),
      tap(() => this.router.navigate(['/']))
    )
  );
  // delete user
  deleteUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap((actions) =>
        this.userService.deleteUser(actions.id).pipe(
          map(() => deleteUserSuccess({ id: actions.id })),
          catchError((error) => of(deleteUsersFailure({ error })))
        )
      )
    )
  );
  //edit user
  editUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUser),
      concatMap((actions) =>
        this.userService.editUser(actions.user.id, actions.user.changes).pipe(
          map((user) => editUserSuccess({ user: actions.user })),
          catchError((error) => of(deleteUsersFailure({ error })))
        )
      ),
      tap(() => this.router.navigate(['/']))
    )
  );
}
