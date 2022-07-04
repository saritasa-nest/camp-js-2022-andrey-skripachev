import { AnimeDto } from '../dtos/anime.dto';

import { Anime } from '../models/anime';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDto): Anime {
    return new Anime({
      start: dto.aired.start,
      id: dto.id,
      image: dto.image,
      status: dto.status,
      titleEng: dto.title_eng,
      titleJpn: dto.title_jpn,
      type: dto.type,
    });
  }
}
