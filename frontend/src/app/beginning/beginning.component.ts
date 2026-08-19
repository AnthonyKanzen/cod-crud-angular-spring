import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Beginning } from '../models/beginning';
import { BeginningService } from '../services/beginning.service';

@Component({
  selector: 'app-beginning',
  imports: [
    MatTableModule,
    MatToolbarModule
  ],
  templateUrl: './beginning.component.html',
  styleUrl: './beginning.component.scss'
})
export class BeginningComponent implements OnInit {

  beginning: Beginning[] = [];

  displayedColumns = ['name', 'category'];

  constructor(private beginningService: BeginningService) {}

  ngOnInit(): void {
    this.beginningService.list().subscribe(data => {
      this.beginning = data;
    });
  }
}
