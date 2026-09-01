import { Component, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
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
    CategoriesPipe
  ],
  templateUrl: './beginning.component.html',
  styleUrl: './beginning.component.scss'
})
export class BeginningComponent implements OnInit {

  beginning: Beginning[] = [];

  displayedColumns = ['name', 'category'];

  loading = true;

  constructor(
    private beginningService: BeginningService,
    private dialog: MatDialog
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
          width: '380px',
        });
      }
    });

  }

}
