import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserState } from '../store/user.reducer';
import { Store } from '@ngrx/store';
import { addUser } from '../store/user.actions';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AddUserComponent implements OnInit {
  addUser: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private _store: Store<UserState>) {}

  ngOnInit(): void {
    this.addUser = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(6)],
      ],
      name: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          // Validators.pattern('[0-9]{0-10}'),
        ],
      ],
      website: ['', [Validators.required, Validators.minLength(6)]],
      company: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(6)]],
        catchPhrase: ['', [Validators.required, Validators.minLength(6)]],
        bs: ['', [Validators.required, Validators.minLength(6)]],
      }),
      address: this.fb.group({
        street: ['', [Validators.required, Validators.minLength(6)]],
        suite: ['', [Validators.required, Validators.minLength(6)]],
        city: ['', [Validators.required, Validators.minLength(6)]],
        zipcode: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6),
          ],
        ],
        geo: this.fb.group({
          lat: ['', [Validators.required, Validators.minLength(6)]],
          lng: ['', [Validators.required, Validators.minLength(6)]],
        }),
      }),
    });
  }
  registerNewUser() {
    this.submitted = true;
    if (this.addUser.invalid) {
      return;
    }
    this._store.dispatch(addUser({ user: this.addUser.value }));
  }
  get f() {
    return this.addUser.controls;
  }
  companyValidation(formGroupName, formControlName) {
    return this.addUser.get(formGroupName).get(formControlName);
  }
  geoValidation(formGroupName, formControlName, formControlNameChild) {
    return this.addUser
      .get(formGroupName)
      .get(formControlName)
      .get(formControlNameChild);
  }
}
