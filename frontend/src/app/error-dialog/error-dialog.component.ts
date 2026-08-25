import { Component } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss'
})
export class ErrorDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<ErrorDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }

}
