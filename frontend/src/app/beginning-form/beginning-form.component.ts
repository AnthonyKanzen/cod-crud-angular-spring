import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-beginning-form',
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './beginning-form.component.html',
  styleUrl: './beginning-form.component.scss'
})
export class BeginningFormComponent {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {

    this.form = this.formBuilder.group({
      name: [''],
      category: ['']
    });

  }

}
