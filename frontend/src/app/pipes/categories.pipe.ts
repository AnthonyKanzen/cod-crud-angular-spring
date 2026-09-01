import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categories'
})
export class CategoriesPipe implements PipeTransform {

  transform(value: string): string {

    switch (value) {

      case 'Front-End':
        return 'code';

      case 'Back-End':
        return 'computer';

      default:
        return 'category';
    }

  }

}
