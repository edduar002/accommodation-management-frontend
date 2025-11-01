import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./components/home/home.component";
import { UserService } from './services/user.service'; // 👈 Importante
import { AdministratorService } from './services/administrator.service'; // 👈 Importante
import { HostService } from './services/host.service'; // 👈 Importante

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mi-app';

  constructor(public userService: UserService, public administratorService: AdministratorService, public hostService: HostService) {} // 👈 Hacemos el servicio accesible al HTML

confirmLogout() {
  this.userService.logout();
  this.administratorService.logout();
  this.hostService.logout();
}

isLoggedIn(): boolean {
  return (
    this.userService.getToken() !== null ||
    this.administratorService.getToken() !== null ||
    this.hostService.getToken() !== null
  );
}

isHostLoggedIn(): boolean {
  return (
    this.userService.getToken() === null &&
    this.administratorService.getToken() === null &&
    this.hostService.getToken() !== null
  );
}

isAdministratorLoggedIn(): boolean {
  return (
    this.userService.getToken() === null &&
    this.administratorService.getToken() !== null &&
    this.hostService.getToken() === null
  );
}

isUserLoggedIn(): boolean {
  return (
    this.userService.getToken() !== null &&
    this.administratorService.getToken() === null &&
    this.hostService.getToken() === null
  );
}


}