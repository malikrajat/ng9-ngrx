import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadUsers, deleteUser } from '../store/user.actions';
import { UserState } from '../store/user.reducer';
import { Observable } from 'rxjs';
import { User } from '../store/user.model';
import { loadUsersList, hasLoaded } from '../store/user.selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class UserListComponent implements OnInit {
  public users$: Observable<User[]>;
  constructor(private _store: Store<UserState>) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this._store.pipe(select(hasLoaded)).subscribe((hasLoaded) => {
      if (hasLoaded) {
        this.users$ = this._store.pipe(select(loadUsersList));
      } else {
        this._store.dispatch(loadUsers());
      }
    });
  }
  public deleteUser(id: string): void {
    if (window.confirm('Are sure you want to delete this item ?')) {
      this._store.dispatch(deleteUser({ id }));
    }
  }
}
