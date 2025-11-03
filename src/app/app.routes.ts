import { Routes } from '@angular/router';

// Importación de todos los componentes que serán usados en las rutas
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoginAdministratorComponent } from './components/login-administrator/login-administrator.component';
import { LoginHostComponent } from './components/login-host/login-host.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterAdministratorComponent } from './components/register-administrator/register-administrator.component';
import { RegisterHostComponent } from './components/register-host/register-host.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import { ChangePasswordAdminComponent } from './components/change-password-admin/change-password-admin.component';
import { ChangePasswordHostComponent } from './components/change-password-host/change-password-host.component';
import { ChangePasswordUserComponent } from './components/change-password-user/change-password-user.component';
import { CreateAccommodationComponent } from './components/create-accommodation/create-accommodation.component';
import { CreateCityComponent } from './components/create-city/create-city.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
import { EditProfileAdminComponent } from './components/edit-profile-admin/edit-profile-admin.component';
import { EditProfileHostComponent } from './components/edit-profile-host/edit-profile-host.component';
import { EditProfileUserComponent } from './components/edit-profile-user/edit-profile-user.component';
import { CreateRoleComponent } from './components/create-role/create-role.component';
import { DetailReservationComponent } from './components/detail-reservation/detail-reservation.component';
import { ManagementDepartmentComponent } from './components/management-department/management-department.component';
import { ManagementCityComponent } from './components/management-city/management-city.component';
import { ManagementRoleComponent } from './components/management-role/management-role.component';
import { ManagementAccommodationsComponent } from './components/management-accommodations/management-accommodations.component';
import { MyAccommodationsComponent } from './components/my-accommodations/my-accommodations.component';
import { ManagementUserComponent } from './components/management-user/management-user.component';
import { ManagementHostComponent } from './components/management-host/management-host.component';
import { EditCityComponent } from './components/edit-city/edit-city.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { EditDepartmentComponent } from './components/edit-department/edit-department.component';
import { EditAccommodationComponent } from './components/edit-accommodation/edit-accommodation.component';
import { EditRoleComponent } from './components/edit-role/edit-role.component';
import { DetailAccommodationComponent } from './components/detail-accommodation/detail-accommodation.component';
import { ResponseCommentComponent } from './components/response-comment/response-comment.component';
import { LocationComponent } from './components/location/location.component';

/**
 * Definición de las rutas de la aplicación.
 * Cada ruta está asociada a un componente que Angular cargará cuando se navegue a la URL correspondiente.
 */
export const routes: Routes = [
  // Ruta principal: Home
  { path: '', component: HomeComponent },

  // Rutas de login
  { path: 'login', component: LoginComponent },
  { path: 'loginHost', component: LoginHostComponent },
  { path: 'loginAdmin', component: LoginAdministratorComponent },
  { path: 'loginUser', component: LoginUserComponent },

  // Rutas de registro
  { path: 'register', component: RegisterComponent },
  { path: 'registerAdmin', component: RegisterAdministratorComponent },
  { path: 'registerUser', component: RegisterUserComponent },
  { path: 'registerHost', component: RegisterHostComponent },

  // Rutas de gestión de reservas
  { path: 'myReservations', component: MyReservationsComponent },
  { path: 'detailReservation/:id', component: DetailReservationComponent },
  { path: 'reservations', component: ReservationsComponent },

  // Rutas de cambio de contraseña (rutas dinámicas con parámetro :id)
  { path: 'changePasswordAdmin/:id', component: ChangePasswordAdminComponent },
  { path: 'changePasswordHost/:id', component: ChangePasswordHostComponent },
  { path: 'changePasswordUser/:id', component: ChangePasswordUserComponent },

  // Rutas de creación de entidades
  { path: 'createAccommodation', component: CreateAccommodationComponent },
  { path: 'createCity', component: CreateCityComponent },
  { path: 'createDepartment', component: CreateDepartmentComponent },
  { path: 'createRole', component: CreateRoleComponent },

  // Rutas de edición de perfil
  { path: 'editProfileAdmin/:id', component: EditProfileAdminComponent },
  { path: 'editProfileHost/:id', component: EditProfileHostComponent },
  { path: 'editProfileUser/:id', component: EditProfileUserComponent },

  // Rutas de gestión administrativa
  { path: 'managementDepartment', component: ManagementDepartmentComponent },
  { path: 'managementCity', component: ManagementCityComponent },
  { path: 'managementRole', component: ManagementRoleComponent },
  {
    path: 'managementAccommodations',
    component: ManagementAccommodationsComponent,
  },
  { path: 'managementUser', component: ManagementUserComponent },
  { path: 'managementHost', component: ManagementHostComponent },

  // Rutas de gestión de alojamientos de usuario
  { path: 'myAccommodations', component: MyAccommodationsComponent },

  // Rutas de edición de entidades (rutas dinámicas con parámetro :id)
  { path: 'editCity/:id', component: EditCityComponent },
  { path: 'editDepartment/:id', component: EditDepartmentComponent },
  { path: 'editAccommodation/:id', component: EditAccommodationComponent },
  { path: 'editRole/:id', component: EditRoleComponent },

  // Ruta de detalles de un alojamiento específico
  { path: 'detailAccommodation/:id', component: DetailAccommodationComponent },

  // Rutas adicionales
  { path: 'responseComment', component: ResponseCommentComponent },
  { path: 'locationComponent', component: LocationComponent },
];