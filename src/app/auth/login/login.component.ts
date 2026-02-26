import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.nonNullable.group({
      login: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  protected onSubmit(): void {
    if (this.form.invalid) return;
    // TODO: call auth service
    console.log('Login', this.form.getRawValue());
  }
}
