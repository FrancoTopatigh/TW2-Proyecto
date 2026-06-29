import { Component, inject, OnDestroy, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../../../../api/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnDestroy {

  fb = inject(FormBuilder);

  authService = inject(AuthService);

  router = inject(Router);

  registerForm: FormGroup = this.fb.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]],
      confirmPassword: ['', Validators.required]
    },{ validators: this.passwordMatchValidator }
  );

  isLoading = signal(false);

  errorMessage = signal<string | null>(null);

  showSuccessToast = signal(false);

  private toastTimeout: any;

  ngOnDestroy(): void {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('contrasena')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { confirmPassword, ...datosRegistro } = this.registerForm.value;

    this.authService.registrar(datosRegistro).subscribe({
      next: (usuarioCreado) => {
        this.isLoading.set(false);
        this.showSuccessToast.set(true);
        this.registerForm.reset();

        setTimeout(() => {
          this.router.navigate(['/auth/signin']);
        }, 2000);

      },
      error: (err) => {
        this.isLoading.set(false);
        if (err.error?.message) {
          this.errorMessage.set(err.error.message);
        } else {
          this.errorMessage.set('Ocurrió un error inesperado');
        }
      }
    });
  }

  closeErrorMessage(): void {
    this.errorMessage.set(null);
  }

  closeSuccessToast(): void {
    this.showSuccessToast.set(false);
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = null;
    }
  }

}
