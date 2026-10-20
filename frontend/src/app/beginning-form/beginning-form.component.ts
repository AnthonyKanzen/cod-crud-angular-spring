
import { Component } from '@angular/core';
import {
  NonNullableFormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Location } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BeginningService } from '../services/beginning.service';
import { Beginning } from '../models/beginning';

@Component({
  selector: 'app-beginning-form',
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './beginning-form.component.html',
  styleUrl: './beginning-form.component.scss'
})
export class BeginningFormComponent {
  form: FormGroup;
  lessonsExpanded = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private beginningService: BeginningService,
    private location: Location,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['', Validators.required],
      lessons: this.formBuilder.array([])
    });
  }

  get lessons(): FormArray {
    return this.form.get('lessons') as FormArray;
  }

  private createLesson(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      youtubeUrl: ['', Validators.required]
    });
  }

  toggleLessons(): void {
    if (!this.lessonsExpanded && this.lessons.length === 0) {
      this.addLesson();
    }

    this.lessonsExpanded = !this.lessonsExpanded;
  }

  addLesson(): void {
    this.lessons.push(this.createLesson());
  }

  removeLesson(index: number): void {
    if (this.lessons.length > 1) {
      this.lessons.removeAt(index);
    }
  }

  onSubmit(): void {
    const nameControl = this.form.get('name');
    const categoryControl = this.form.get('category');

    if (
      !nameControl?.valid ||
      !categoryControl?.valid ||
      (this.lessonsExpanded && !this.lessons.valid)
    ) {
      nameControl?.markAsTouched();
      categoryControl?.markAsTouched();

      if (this.lessonsExpanded) {
        this.lessons.markAllAsTouched();
      }

      this.snackBar.open(
        'Preencha todos os campos obrigatórios!',
        'Fechar',
        { duration: 3000 }
      );
      return;
    }

    const course = {
      name: nameControl.value,
      category: categoryControl.value,
      lessons: this.lessonsExpanded ? this.lessons.getRawValue() : []
    } as Beginning;

    this.beginningService.save(course).subscribe({
      next: result => {
        console.log('Curso salvo:', result);
        this.snackBar.open(
          'Curso salvo com sucesso!',
          'Fechar',
          { duration: 3000 }
        );
        this.location.back();
      },
      error: error => {
        console.error('Erro ao salvar o curso:', error);
        this.snackBar.open(
          'Erro ao salvar o curso!',
          'Fechar',
          { duration: 3000 }
        );
      }
    });
  }

  onCancel(): void {
    this.location.back();
  }
}
