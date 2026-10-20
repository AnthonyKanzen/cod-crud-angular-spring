import { Lesson } from './lesson';

export interface Beginning {
  _id: string;
  name: string;
  category: string;
  lessons: Lesson[];
}
