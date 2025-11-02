import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';
import { ResponseCommentComponent } from '../response-comment/response-comment.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, ResponseCommentComponent],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [CommentService],
})
export class CommentsComponent implements OnInit {
  // Objeto para el nuevo comentario
  public comment: Comment;

  // Lista de comentarios del alojamiento
  public comments: Comment[] = [];

  // Mensaje de error a mostrar en modales
  public errorMessage: string = '';

  // ID del alojamiento actual
  private accommodationId!: number;

  /**
   * Constructor del componente
   * @param _commentService Servicio para operaciones de comentarios
   * @param _userService Servicio para obtener datos del usuario actual
   * @param _route Servicio para obtener parámetros de la URL
   * @param _router Servicio para redireccionamiento
   */
  constructor(
    private _commentService: CommentService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    // Inicializa el objeto comment con valores por defecto
    this.comment = new Comment('', new Date(), 0, 1, '');
  }

  /** Ciclo de vida OnInit */
  ngOnInit(): void {
    this.getAccommodationId();
  }

  /**
   * Obtener el ID del alojamiento desde los parámetros de la URL
   */
  getAccommodationId(): void {
    this._route.params.subscribe((params) => {
      this.accommodationId = +params['id'];

      if (this.accommodationId) {
        // Cargar comentarios si hay un ID válido
        this.loadComments();
      } else {
        // Mostrar error en consola y redirigir si no hay ID
        console.error('No se encontró el ID del alojamiento');
        this._router.navigate(['/']);
      }
    });
  }

  /**
   * Cargar los comentarios asociados al alojamiento actual
   */
  loadComments(): void {
    this._commentService.getByAccommodation(this.accommodationId).subscribe({
      next: (response) => {
        // Asignar los comentarios recibidos
        this.comments = Array.isArray(response) ? response : [];
      },
      error: (error) => {
        console.error('Error al cargar comentarios:', error);
      },
    });
  }

  /**
   * Registrar un nuevo comentario
   * @param form Formulario Angular (NgForm)
   */
  onSubmit(form: NgForm): void {
    // Validar formulario antes de enviar
    if (!form.valid) {
      this.errorMessage = 'Por favor escribe tu comentario.';
      const errorModal = document.getElementById('errorModal');
      if (errorModal) {
        const modal = new (window as any).bootstrap.Modal(errorModal);
        modal.show();
      }
      return; // Detener ejecución si formulario inválido
    }

    // Asignar información necesaria al objeto comment
    this.comment.accommodationsId = this.accommodationId;
    this.comment.date = new Date();
    const user = this._userService.getUser();
    if (user && user.id) {
      this.comment.usersId = user.id;
    }

    // Llamar al servicio para registrar comentario
    this._commentService.register(this.comment).subscribe({
      next: (response) => {

        // Mostrar modal de éxito
        const modalEl = document.getElementById('successModal');
        if (modalEl) {
          const modal = new (window as any).bootstrap.Modal(modalEl);
          modal.show();
        }

        // Limpiar formulario
        form.resetForm();
        // Recargar lista de comentarios
        this.loadComments();
      },
      error: (error) => {
        console.error('Error al crear comentario:', error);
        this.errorMessage = 'Hubo un problema al guardar el comentario.';

        // Mostrar modal de error
        const errorModal = document.getElementById('errorModal');
        if (errorModal) {
          const modal = new (window as any).bootstrap.Modal(errorModal);
          modal.show();
        }
      },
    });
  }

  /**
   * Cierra el modal de éxito y recarga la lista de comentarios
   */
  closeModal(): void {
    const modalEl = document.getElementById('successModal');
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();
      // Remover clase que bloquea scroll
      document.body.classList.remove('modal-open');
      // Remover backdrop
      document.querySelector('.modal-backdrop')?.remove();
    }

    // Recargar comentarios después de cerrar el modal
    this.loadComments();
  }
}