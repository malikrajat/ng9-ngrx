import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserState } from '../store/user.reducer';
import { Store, select } from '@ngrx/store';
import { editUser, loadUser } from '../store/user.actions';
import { ActivatedRoute } from '@angular/router';
import { selectedUserDetails } from '../store/user.selectors';
import { User } from '../store/user.model';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class EditUserComponent implements OnInit {
  editUser: FormGroup;
  submitted = false;
  userToEdit: User;
  constructor(
    private fb: FormBuilder,
    private _store: Store<UserState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initEditForm();
    //get user to edit
    this._store.dispatch(
      loadUser({ id: this.route.snapshot.paramMap.get('id') })
    );
    // load user from store
    this._store.select(selectedUserDetails).subscribe((user) => {
      this.userToEdit = Object.assign(new User(), user);
      const dataUser = this.userToEdit;
      if (Object.keys(dataUser).length > 2) {
        this.loadDateToEditForm(dataUser);
      }
    });
  }
  // init edit form
  private initEditForm() {
    this.editUser = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(6)],
      ],
      name: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      phone: [
        '',
        [
          Validators.required,
          // Validators.minLength(10),
          // Validators.maxLength(10),
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
            // Validators.minLength(6),
            // Validators.maxLength(6),
          ],
        ],
        geo: this.fb.group({
          lat: ['', [Validators.required, Validators.minLength(6)]],
          lng: ['', [Validators.required, Validators.minLength(6)]],
        }),
      }),
    });
  }
  //set data to form
  private loadDateToEditForm(User) {
    this.editUser.patchValue({
      email: User.email,
      name: User.name,
      username: User.username,
      phone: User.phone,
      website: User.website,
      company: {
        name: User.company.name,
        catchPhrase: User.company.catchPhrase,
        bs: User.company.bs,
      },
      address: {
        street: User.address.street,
        suite: User.address.suite,
        city: User.address.city,
        zipcode: User.address.zipcode,
        geo: {
          lat: User.address.geo.lat,
          lng: User.address.geo.lng,
        },
      },
    });
  }
  //update user
  updateUser() {
    this.submitted = true;
    if (this.editUser.invalid) {
      return;
    }
    const update: Update<User> = {
      id: this.userToEdit.id,
      changes: this.editUser.value,
    };
    this._store.dispatch(editUser({ user: update }));
  }
  // get form error
  get f() {
    return this.editUser.controls;
  }
  // get form company error
  public companyValidation(formGroupName, formControlName) {
    return this.editUser.get(formGroupName).get(formControlName);
  }
  //get form geo error
  public geoValidation(formGroupName, formControlName, formControlNameChild) {
    return this.editUser
      .get(formGroupName)
      .get(formControlName)
      .get(formControlNameChild);
  }
  // get c () { return this.f.company ; }
  // get a () { return this.f.address ; }
}
