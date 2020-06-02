import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers } from '../store/user.actions';
import { UserState } from '../store/user.reducer';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  constructor(private _store: Store<UserState>) {}

  ngOnInit(): void {
    this._store.dispatch(loadUsers());
  }
}
