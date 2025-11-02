// Importaciones necesarias para el componente Angular
import { Component } from '@angular/core'; // Decorador para definir un componente
import { RouterLink } from '@angular/router'; // Permite usar enlaces de rutas en el HTML
import { CommonModule } from '@angular/common'; // Proporciona directivas comunes como ngIf, ngFor

@Component({
  selector: 'app-register', // Nombre del selector del componente que se usa en HTML
  standalone: true, // Indica que el componente es independiente y no requiere estar en un módulo
  imports: [CommonModule, RouterLink], // Módulos importados para usar en este componente
  templateUrl: './register.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./register.component.css'], // Ruta al archivo de estilos CSS
})
export class RegisterComponent {
  // Componente principal para la selección de registro de usuario
  // Actualmente no tiene métodos ni propiedades
}