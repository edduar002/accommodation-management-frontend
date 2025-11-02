// Importaciones necesarias para el componente Angular
import { Component } from '@angular/core'; // Decorador para definir un componente
import { CommonModule } from '@angular/common'; // Proporciona directivas comunes como ngIf y ngFor

@Component({
  selector: 'app-my-reservations', // Nombre del selector del componente que se usa en HTML
  standalone: true, // Indica que el componente es independiente y no requiere un módulo
  imports: [CommonModule], // Módulos que se importan para usar en este componente
  templateUrl: './my-reservations.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./my-reservations.component.css'], // Ruta al archivo de estilos CSS
})
export class MyReservationsComponent {
  // Componente principal para gestionar las reservas del usuario
  // Actualmente no tiene métodos ni propiedades
}