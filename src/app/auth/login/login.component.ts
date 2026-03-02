import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    this.form = this.fb.nonNullable.group({
      login: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  protected onSubmit(): void {
    if (this.form.invalid) return;
    const credentials = this.form.getRawValue() as {
      login: string;
      senha: string;
    };

    this.auth.login(credentials).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erro ao fazer login', err);
      },
    });
  }
}
