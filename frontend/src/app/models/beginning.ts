import { Lesson } from './lesson';

export interface Beginning {
  id: number;
  name: string;
  category: string;
  lessons: Lesson[];
}
