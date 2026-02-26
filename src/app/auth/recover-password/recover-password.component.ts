import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css',
})
export class RecoverPasswordComponent {
  protected form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  protected onSubmit(): void {
    if (this.form.invalid) return;
    // TODO: call recover-password API
    console.log('Recover password', this.form.getRawValue());
  }
}
