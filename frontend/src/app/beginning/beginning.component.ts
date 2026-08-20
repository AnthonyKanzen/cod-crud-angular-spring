import { Component, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Beginning } from '../models/beginning';
import { BeginningService } from '../services/beginning.service';

@Component({
  selector: 'app-beginning',
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './beginning.component.html',
  styleUrl: './beginning.component.scss'
})
export class BeginningComponent implements OnInit {

  beginning: Beginning[] = [];

  displayedColumns = ['name', 'category'];

  loading = true;

  constructor(private beginningService: BeginningService) {}

  ngOnInit(): void {
    this.beginningService.list().subscribe({
      next: data => {
        this.beginning = data;
        this.loading = false;
      },
      error: error => {
        console.error(error);
        this.loading = false;
      }
    });
  }

}
