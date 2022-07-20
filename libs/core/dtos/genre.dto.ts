import { GenreType } from '../utils/types/genre';

export interface GenreDto {
  readonly id: number;
  readonly created: string;
  readonly modified: string;
  readonly name: string;
  readonly type: GenreType;
}
