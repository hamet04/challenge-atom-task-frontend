import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, CommonModule, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  readonly email = new FormControl('', {
    validators: [Validators.required, Validators.pattern(emailPattern)],
    updateOn: 'change'
  });
  errorMessage: string | null = 'Campo requerido';

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'Campo requerido'
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Email no válido'
    } else {
      this.errorMessage = null
    }
  }

  login() {
    if (!!this.errorMessage) {
      return;
    }

    this.authService.login(this.email.value).subscribe(
      (user) => {
        if (user) {
          this.router.navigate(['/home']);
        } else {
          this.openDialog()
        }
      },
      (error) => {
        console.error("error", error);
        this.openDialog()
      }
    )
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { email: this.email.value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.register({
          email: this.email.value
        }).subscribe(
          (data) => {
            this.login()
          },
          (error) => {
            console.error(error);
          }
        )
      }
    });
  }
}