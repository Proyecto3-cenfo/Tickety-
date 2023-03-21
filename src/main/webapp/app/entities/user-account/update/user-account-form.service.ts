import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUserAccount, NewUserAccount } from '../user-account.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUserAccount for edit and NewUserAccountFormGroupInput for create.
 */
type UserAccountFormGroupInput = IUserAccount | PartialWithRequiredKeyOf<NewUserAccount>;

type UserAccountFormDefaults = Pick<NewUserAccount, 'id'>;

type UserAccountFormGroupContent = {
  id: FormControl<IUserAccount['id'] | NewUserAccount['id']>;
  email: FormControl<IUserAccount['email']>;
  password: FormControl<IUserAccount['password']>;
  name: FormControl<IUserAccount['name']>;
  lastName: FormControl<IUserAccount['lastName']>;
  genderu: FormControl<IUserAccount['genderu']>;
  organization: FormControl<IUserAccount['organization']>;
};

export type UserAccountFormGroup = FormGroup<UserAccountFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UserAccountFormService {
  createUserAccountFormGroup(userAccount: UserAccountFormGroupInput = { id: null }): UserAccountFormGroup {
    const userAccountRawValue = {
      ...this.getFormDefaults(),
      ...userAccount,
    };
    return new FormGroup<UserAccountFormGroupContent>({
      id: new FormControl(
        { value: userAccountRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      email: new FormControl(userAccountRawValue.email),
      password: new FormControl(userAccountRawValue.password),
      name: new FormControl(userAccountRawValue.name),
      lastName: new FormControl(userAccountRawValue.lastName),
      genderu: new FormControl(userAccountRawValue.genderu),
      organization: new FormControl(userAccountRawValue.organization),
    });
  }

  getUserAccount(form: UserAccountFormGroup): IUserAccount | NewUserAccount {
    return form.getRawValue() as IUserAccount | NewUserAccount;
  }

  resetForm(form: UserAccountFormGroup, userAccount: UserAccountFormGroupInput): void {
    const userAccountRawValue = { ...this.getFormDefaults(), ...userAccount };
    form.reset(
      {
        ...userAccountRawValue,
        id: { value: userAccountRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UserAccountFormDefaults {
    return {
      id: null,
    };
  }
}