import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Beginning } from '../models/beginning';
import { BeginningService } from '../services/beginning.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { CategoriesPipe } from '../pipes/categories.pipe';

@Component({
  selector: 'app-beginning',
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    CategoriesPipe
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

        this.dialog.open(ErrorDialogComponent, {
          width: '380px'
        });
      }
    });
  }

  onAdd(): void {
    this.router.navigate(['new'], {
      relativeTo: this.route
    });
  }

  onEdit(beginning: Beginning): void {
  this.router.navigate(['edit', beginning._id], {
    relativeTo: this.route
  });
}

  onDelete(beginning: Beginning): void {
    console.log('Excluir:', beginning);
  }
}
