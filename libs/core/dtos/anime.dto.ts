import { AiredDto } from './aired.dto';

export interface AnimeDto {
  readonly aired: AiredDto;
  readonly created: string;
  readonly id: number;
  readonly image: string;
  readonly status: string;
  readonly title_eng: string;
  readonly title_jpn: string;
  readonly type: string;
}
