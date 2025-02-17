import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-close-session-dialog',
  templateUrl: './close-session-dialog.component.html',
  styleUrl: './close-session-dialog.component.scss',
  imports: [MatButtonModule, MatDialogContent, MatDialogActions, CommonModule]
})
export class CloseSessionDialogComponent {
  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<CloseSessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm() {
    this.dialogRef.close(true)
    this.authService.logout()
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}