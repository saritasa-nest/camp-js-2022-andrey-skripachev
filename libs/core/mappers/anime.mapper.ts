import { AnimeDto } from '../dtos/anime.dto';
import { Status, Type } from '../utils/types/anime';

import { Anime } from '../models/anime';
import { isStatus } from '../guards/animeStatus';
import { isType } from '../guards/animeType';

import { AiredMapper } from './aired.mapper';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime series dto.
   */
  export function fromDto(dto: AnimeDto): Anime {

    const { status, type } = dto;

    const statusValue = isStatus(status) ? Status[status] : null;
    const typeValue = isType(type) ? Type[type] : null;

    return new Anime({
      aired: AiredMapper.fromDto(dto.aired),
      id: dto.id,
      image: dto.image,
      status: statusValue,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      type: typeValue,
    });
  }
}
