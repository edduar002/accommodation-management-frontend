import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
  providers: [UserService]
})
export class LoginUserComponent {
  public user: User;

  constructor(private http: HttpClient, private _userService: UserService){
    this.user = new User('', '', '', '', '', new Date(), '', 1, 1, new Date(), new Date(), true)
  }

  onSubmit(form: NgForm): void {
    this._userService.login(this.user).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
