import { AbstractControl } from '@angular/forms';

export class FormUtils {
  static readonly messages = {
    courseName: {
      required: 'O nome do curso é obrigatório.',
      maxlength: 'O nome pode ter no máximo 50 caracteres.'
    },
    category: {
      required: 'A categoria é obrigatória.'
    },
    lessonName: {
      required: 'Informe o nome da aula.'
    },
    lessonYoutubeUrl: {
      required: 'Informe o código do vídeo.'
    }
  };

  static getErrorMessage(
    control: AbstractControl | null,
    field: keyof typeof FormUtils.messages
  ): string {
    if (!control || !control.touched) {
      return '';
    }

    const messages = this.messages[field];

    if (control.hasError('required')) {
      return messages.required;
    }

    if (control.hasError('maxlength') && 'maxlength' in messages) {
      return messages.maxlength;
    }

    return '';
  }
}

