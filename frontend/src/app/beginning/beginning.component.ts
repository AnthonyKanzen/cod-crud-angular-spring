import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { Beginning } from '../models/beginning';
import { BeginningService } from '../services/beginning.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { CategoriesPipe } from '../pipes/categories.pipe';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-beginning',
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    CategoriesPipe,
    DeleteDialogComponent
  ],
  templateUrl: './beginning.component.html',
  styleUrl: './beginning.component.scss'
})
export class BeginningComponent implements OnInit {
  beginning: Beginning[] = [];
  displayedColumns = ['name', 'category', 'actions'];
  loading = true;

  constructor(
    private beginningService: BeginningService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.beginningService.list().subscribe({
      next: data => {
        this.beginning = data;
        this.loading = false;
      },
      error: error => {
        console.error(error);
        this.loading = false;
        this.dialog.open(ErrorDialogComponent, { width: '380px' });
      }
    });
  }

  onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(beginning: Beginning): void {
    this.router.navigate(['edit', beginning._id], { relativeTo: this.route });
  }

  onDelete(beginning: Beginning): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { width: '380px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.beginningService.delete(beginning._id).subscribe({
          next: () => {
            this.beginning = this.beginning.filter(course => course._id !== beginning._id);
            this.snackBar.open('Curso excluído com sucesso!', 'Fechar', { duration: 3000 });
          },
          error: error => {
            console.error('Erro ao excluir o curso:', error);
            this.snackBar.open('Erro ao excluir o curso!', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }
}
