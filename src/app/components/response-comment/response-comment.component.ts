import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Response } from '../../models/response';
import { ResponseService } from '../../services/response.service';
import { UserService } from '../../services/user.service';
import { AdministratorService } from '../../services/administrator.service';
import { HostService } from '../../services/host.service';

@Component({
  selector: 'app-response-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './response-comment.component.html',
  styleUrl: './response-comment.component.css',
  providers: [ResponseService],
})
export class ResponseCommentComponent implements OnInit {
  /**
   * Identificador del comentario al que se asociarán las respuestas
   */
  @Input() commentId!: number | undefined;

  /** Objeto para crear una nueva respuesta */
  public response: Response;

  /** Listado de respuestas existentes para el comentario */
  public responses: Response[] = [];

  /** Mensaje de error para mostrar en modales */
  public errorMessage: string = '';

  constructor(
    private _responseService: ResponseService,
    public userService: UserService,
    public administratorService: AdministratorService,
    public hostService: HostService,
    private router: Router
  ) {
    // Inicializamos la respuesta vacía
    this.response = new Response('', 1, new Date(), '');
  }

  /**
   * Ciclo de vida OnInit
   * Carga las respuestas existentes al iniciar el componente
   */
  ngOnInit(): void {
    this.loadResponses();
  }

  /**
   * Carga todas las respuestas asociadas al comentario
   */
  loadResponses(): void {
    if (!this.commentId) return; // Si no hay commentId, no hacemos nada

    // Llamamos al servicio para obtener respuestas por comentario
    this._responseService.getByComment(this.commentId).subscribe({
      next: (resp) => {
        this.responses = resp; // Guardamos las respuestas recibidas
      },
      error: (err) => {
        console.error('Error al cargar respuestas:', err);
      },
    });
  }

  /**
   * Envía una nueva respuesta asociada al comentario actual
   * @param form Formulario de Angular para validación y reset
   */
  onSubmitResponse(form: NgForm): void {
    if (!form.valid) return; // Validación: no enviar si el formulario es inválido

    this.response.commentsId = this.commentId; // Asociamos la respuesta al comentario
    this.response.date = new Date(); // Fecha actual de la respuesta

    // Obtenemos el host que está enviando la respuesta
    const host = this.hostService.getHost();
    if (host && host.id) {
      this.response.hostsId = host.id; // Asociamos el ID del host
    }

    // Llamamos al servicio para registrar la respuesta
    this._responseService.register(this.response).subscribe({
      next: () => {
        form.resetForm(); // Limpiamos el formulario
        this.loadResponses(); // Recargamos las respuestas para actualizar la lista
        this.showModal('successModal'); // Mostramos modal de éxito
      },
      error: (err) => {
        console.error('Error al crear respuesta:', err);
        this.errorMessage =
          err?.error?.message ||
          'No se pudo enviar la respuesta. Inténtalo nuevamente.';
        this.showModal('errorModal'); // Mostramos modal de error
      },
    });
  }

  /**
   * Método para verificar si el usuario logueado es un anfitrión.
   * Retorna true solo si no hay usuario ni administrador logueado, y sí hay anfitrión.
   */
  isHostLoggedIn(): boolean {
    return (
      this.userService.getToken() === null && // Usuario no logueado
      this.administratorService.getToken() === null && // Administrador no logueado
      this.hostService.getToken() !== null // Anfitrión logueado
    );
  }

  /**
   * Muestra un modal de Bootstrap dado su ID
   * @param id ID del modal a mostrar
   */
  private showModal(id: string): void {
    const modalEl = document.getElementById(id);
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  /**
   * Cierra un modal de Bootstrap dado su ID
   * @param id ID del modal a cerrar
   * @param redirect Indica si se debe redirigir después de cerrar
   */
  closeModal(id: string, redirect: boolean = false): void {
    const modalEl = document.getElementById(id);
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(
        modalEl
      );
      modalInstance?.hide(); // Ocultamos el modal
    }

    if (redirect) {
      this.router.navigate(['/']); // Redirigimos a la página principal
    }
  }
}
