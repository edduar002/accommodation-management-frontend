import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PasswordUtilsService {
  isStrong(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return regex.test(password);
  }
}
