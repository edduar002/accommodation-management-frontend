import { Component } from '@angular/core'; // Importa el decorador Component para definir un componente Angular
import { RouterLink } from '@angular/router'; // Importa RouterLink para usar enlaces de navegación en el template
import { CommonModule } from '@angular/common'; // Importa CommonModule para directivas comunes de Angular (ngIf, ngFor, etc.)

// Componente LoginComponent: representa la página de selección de tipo de cuenta y login
@Component({
  selector: 'app-login', // Selector del componente que se usa en templates HTML
  standalone: true, // Componente independiente, no necesita declararse en un módulo
  imports: [CommonModule, RouterLink], // Módulos necesarios dentro de este componente standalone
  templateUrl: './login.component.html', // Ruta al archivo HTML del componente
  styleUrl: './login.component.css', // Ruta al archivo CSS del componente (estilos)
})
export class LoginComponent {
  // Clase vacía porque no requiere lógica adicional; solo muestra la vista HTML
}