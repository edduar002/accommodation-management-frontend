import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Response } from '../../models/response';
import { ResponseService } from '../../services/response.service';

@Component({
  selector: 'app-response-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './response-comment.component.html',
  styleUrl: './response-comment.component.css',
  providers: [ResponseService],
})
export class ResponseCommentComponent implements OnInit {
  // 📥 Entrada
  @Input() commentId!: number | undefined;

  // <i class="bi bi-chat-fill" aria-hidden="true"></i> Propiedades
  public response: Response;
  public responses: Response[] = [];
  public errorMessage: string = '';

  constructor(
    private _responseService: ResponseService,
    private router: Router
  ) {
    this.response = new Response('', 1, new Date(), '');
  }

  // 🚀 Al iniciar, cargar respuestas existentes
  ngOnInit(): void {
    this.loadResponses();
  }

  // 📦 Cargar respuestas asociadas al comentario
  loadResponses(): void {
    if (!this.commentId) return;

    this._responseService.getByComment(this.commentId).subscribe({
      next: (resp) => (this.responses = resp),
      error: (err) => console.error('Error al cargar respuestas:', err),
    });
  }

  // ✉️ Enviar nueva respuesta
  onSubmitResponse(form: NgForm): void {
    if (!form.valid) return;

    this.response.commentsId = this.commentId;
    this.response.date = new Date();
    this.response.hostsId = 2; // ID temporal o dinámico

    this._responseService.register(this.response).subscribe({
      next: () => {
        form.resetForm();
        this.loadResponses();
        this.showModal('successModal');
      },
      error: (err) => {
        console.error('Error al crear respuesta:', err);
        this.errorMessage =
          err?.error?.message ||
          'No se pudo enviar la respuesta. Inténtalo nuevamente.';
        this.showModal('errorModal');
      },
    });
  }

  // 🪟 Mostrar modal (usa API Bootstrap)
  private showModal(id: string): void {
    const modalEl = document.getElementById(id);
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  // 🔒 Cerrar modal y redirigir opcionalmente
  closeModal(id: string, redirect: boolean = false): void {
    const modalEl = document.getElementById(id);
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(
        modalEl
      );
      modalInstance?.hide();
    }

    if (redirect) {
      this.router.navigate(['/']);
    }
  }
}
