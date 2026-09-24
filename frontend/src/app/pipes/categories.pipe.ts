import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categories'
})
export class CategoriesPipe implements PipeTransform {

 transform(category: string): string {
  switch (category) {
    case 'front-end':
      return 'code';
    case 'back-end':
      return 'computer';
    case 'banco-de-dados':
      return 'inventory_2';
    default:
      return 'school';
  }
}

}
