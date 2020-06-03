import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadUsers } from '../store/user.actions';
import { UserState, selectAll } from '../store/user.reducer';
import { Observable } from 'rxjs';
import { User } from '../store/user.model';
import { loadUsersList } from '../store/user.selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class UserListComponent implements OnInit {
  public users$: Observable<User[]>;
  constructor(private _store: Store<UserState>) {}

  ngOnInit(): void {
    this._store.dispatch(loadUsers());
    this.loadUsers();
  }
  private loadUsers(): void {
    this.users$ = this._store.pipe(select(loadUsersList));
  }
  public deleteUser(userId: number): void {
    if (window.confirm('Are sure you want to delete this item ?')) {
    }
  }
}
