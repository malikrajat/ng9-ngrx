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
  users$: Observable<User[]>;
  constructor(private _store: Store<UserState>) {}

  ngOnInit(): void {
    this._store.dispatch(loadUsers());
    this.loadUsers();
  }
  loadUsers() {
    this.users$ = this._store.pipe(select(loadUsersList));
  }
}
