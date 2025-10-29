import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
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
  @Input() commentId!: number | undefined;
  public response: Response;
  public responses: Response[] = []; // ✅ lista de respuestas

  constructor(
    private _responseService: ResponseService,
    private router: Router
  ) {
    this.response = new Response('', 1, new Date(), 1);
  }

  ngOnInit(): void {
    this.loadResponses();
  }

  loadResponses() {
    console.log(this.responses)
    if (!this.commentId) return;
    this._responseService.getByComment(this.commentId).subscribe({
      next: (resp) => {
        this.responses = resp;
      },
      error: (err) => console.error('Error al cargar respuestas:', err),
    });
  }

  onSubmitResponse(form: NgForm): void {
    if (!form.valid) return;

    this.response.commentsId = this.commentId;
    this.response.date = new Date();
    this.response.hostsId = 2;

    this._responseService.register(this.response).subscribe({
      next: () => {
        form.reset();
        this.loadResponses(); // ✅ Recargar lista después de enviar
      },
      error: (err) => console.error('Error al crear respuesta:', err),
    });
  }
}