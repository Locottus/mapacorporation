import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../../core/api';
import { Schedule } from '../../shared/schedule/schedule';

export type SendState = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Schedule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly api = inject(Api);
  private readonly fb = inject(FormBuilder);

  protected readonly state = signal<SendState>('idle');
  protected readonly feedback = signal('');

  readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.maxLength(100)]],
    apellido: ['', [Validators.maxLength(100)]],
    telefono: ['', [Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    mensaje: ['', [Validators.maxLength(2000)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.state.set('sending');
    this.api.sendContact(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.state.set('sent');
        this.feedback.set(res.message);
        this.form.reset();
      },
      error: () => {
        this.state.set('error');
        this.feedback.set('No se pudo enviar el mensaje. Inténtalo de nuevo.');
      },
    });
  }

  invalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.invalid && control.touched;
  }
}
