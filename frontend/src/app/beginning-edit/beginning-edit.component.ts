import { Component } from '@angular/core';

import {
  NonNullableFormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { BeginningService } from '../services/beginning.service';

@Component({
  selector: 'app-beginning-edit',
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './beginning-edit.component.html',
  styleUrl: './beginning-edit.component.scss'
})
export class BeginningEditComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private beginningService: BeginningService,
    private location: Location,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['', Validators.required],
      lessons: this.formBuilder.array([])
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.beginningService.findById(id).subscribe({
        next: course => {
          console.log('Curso encontrado:', course);

          this.form.patchValue({
            name: course.name,
            category: course.category
          });

          this.lessons.clear();

          (course.lessons ?? []).forEach(lesson => {
            this.lessons.push(
              this.createLesson({
                name: lesson.name,
                youtubeUrl: lesson.youtubeUrl?.replace(
                  /^https:\/\/youtu\.be\//,
                  ''
                ) ?? ''
              })
            );
          });
        },
        error: error => {
          console.error('Erro ao carregar o curso:', error);
          this.snackBar.open(
            'Erro ao carregar o curso!',
            'Fechar',
            { duration: 3000 }
          );
        }
      });
    }
  }

  get lessons(): FormArray {
    return this.form.get('lessons') as FormArray;
  }

  private createLesson(lesson?: { name: string; youtubeUrl: string }): FormGroup {
    return this.formBuilder.group({
      name: [lesson?.name ?? '', Validators.required],
      youtubeUrl: [lesson?.youtubeUrl ?? '', Validators.required]
    });
  }

  addLesson(): void {
    this.lessons.push(this.createLesson());
  }

  removeLesson(index: number): void {
    this.lessons.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const id = this.route.snapshot.paramMap.get('id');

      if (!id) {
        return;
      }

      const formValue = this.form.getRawValue();

      const course = {
        ...formValue,
        lessons: formValue.lessons.map(
          (lesson: { name: string; youtubeUrl: string }) => ({
            ...lesson,
            youtubeUrl: lesson.youtubeUrl.startsWith('http')
              ? lesson.youtubeUrl
              : `https://youtu.be/${lesson.youtubeUrl.trim()}`
          })
        )
      };

      this.beginningService.update(id, course).subscribe({
        next: result => {
          console.log('Curso atualizado:', result);
          this.snackBar.open(
            'Curso atualizado com sucesso!',
            'Fechar',
            { duration: 3000 }
          );
          this.location.back();
        },
        error: error => {
          console.error('Erro ao atualizar o curso:', error);
          this.snackBar.open(
            'Erro ao atualizar o curso!',
            'Fechar',
            { duration: 3000 }
          );
        }
      });
    } else {
      this.form.markAllAsTouched();
      this.snackBar.open(
        'Preencha todos os campos obrigatórios!',
        'Fechar',
        { duration: 3000 }
      );
    }
  }

  onCancel(): void {
    this.location.back();
  }
}
