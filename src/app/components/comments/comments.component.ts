import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [CommentService],
})
export class CommentsComponent implements OnInit {
  public comment: Comment;
  public comments: Comment[] = [];
  public errorMessage: string = '';
  private accommodationId!: number;

  constructor(
    private _commentService: CommentService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.comment = new Comment('', 0, 1);
  }

  ngOnInit(): void {
    this.getAccommodationId();
  }

  /** Obtener el ID del alojamiento desde la URL */
  getAccommodationId(): void {
    this._route.params.subscribe((params) => {
      this.accommodationId = +params['id'];
      if (this.accommodationId) {
        this.loadComments();
      } else {
        console.error('No se encontró el ID del alojamiento');
        this._router.navigate(['/']);
      }
    });
  }

  /** Cargar los comentarios del alojamiento */
  loadComments(): void {
    this._commentService.getByAccommodation(this.accommodationId).subscribe({
      next: (response) => {
        this.comments = Array.isArray(response) ? response : [];
      },
      error: (error) => {
        console.error('Error al cargar comentarios:', error);
      },
    });
  }

  /** Registrar nuevo comentario */
  onSubmit(form: NgForm): void {
    if (!form.valid) {
      this.errorMessage = 'Por favor escribe tu comentario.';
      const errorModal = document.getElementById('errorModal');
      if (errorModal) {
        const modal = new (window as any).bootstrap.Modal(errorModal);
        modal.show();
      }
      return;
    }

    this.comment.accommodationsId = this.accommodationId;

    this._commentService.register(this.comment).subscribe({
      next: (response) => {
        console.log('Comentario creado:', response);

        // ✅ Mostrar el modal de éxito
        const modalEl = document.getElementById('successModal');
        if (modalEl) {
          const modal = new (window as any).bootstrap.Modal(modalEl);
          modal.show();
        }

        form.resetForm(); // Limpia el formulario
        this.loadComments(); // Recarga la lista de comentarios
      },
      error: (error) => {
        console.error('Error al crear comentario:', error);
        this.errorMessage = 'Hubo un problema al guardar el comentario.';

        const errorModal = document.getElementById('errorModal');
        if (errorModal) {
          const modal = new (window as any).bootstrap.Modal(errorModal);
          modal.show();
        }
      },
    });
  }

  /** Cerrar modal de éxito */
  closeModal(): void {
    const modalEl = document.getElementById('successModal');
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();
      document.body.classList.remove('modal-open');
      document.querySelector('.modal-backdrop')?.remove();
    }

    // ✅ Recargar lista al cerrar modal
    this.loadComments();
  }
}