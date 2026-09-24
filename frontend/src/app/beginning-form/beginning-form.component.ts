import { Component } from '@angular/core';
import {
  NonNullableFormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Location } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BeginningService } from '../services/beginning.service';

@Component({
  selector: 'app-beginning-form',
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './beginning-form.component.html',
  styleUrl: './beginning-form.component.scss'
})
export class BeginningFormComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private beginningService: BeginningService,
    private location: Location,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.beginningService.save(this.form.value).subscribe({
        next: result => {
          console.log('Curso salvo:', result);
          this.snackBar.open('Curso salvo com sucesso!', 'Fechar', { duration: 3000 });
          this.location.back();
        },
        error: error => {
          console.error('Erro ao salvar o curso:', error);
          this.snackBar.open('Erro ao salvar o curso!', 'Fechar', { duration: 3000 });
        }
      });
    } else {
      this.form.markAllAsTouched();
      this.snackBar.open('Preencha todos os campos obrigatórios!', 'Fechar', { duration: 3000 });
    }
  }

  onCancel(): void {
    this.location.back();
  }
}
