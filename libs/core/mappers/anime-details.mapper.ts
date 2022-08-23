import { AnimeDetailsDto } from '../dtos/anime-details.dto';
import { AnimeDetails } from '../models/anime-details';

import { AnimeMapper } from './anime.mapper';
import { GenreMapper } from './genre.mapper';
import { StudioMapper } from './studio.mapper';

export namespace AnimeDetailsMapper {

  /**
   * Maps dto to model.
   * @param dto Anime details dto.
   */
  export function fromDto(dto: AnimeDetailsDto): AnimeDetails {
    return new AnimeDetails({
      ...AnimeMapper.fromDto(dto),
      trailerYoutubeId: dto.trailer_youtube_id,
      synopsis: dto.synopsis,
      isAiring: dto.airing,
      studiosIdList: dto.studios,
      genresIdList: dto.genres,
      studiosData: dto.studios_data.map(StudioMapper.fromDto),
      genresData: dto.genres_data.map(GenreMapper.fromDto),
      source: dto.source,
      rating: dto.rating,
      season: dto.season,
      background: dto.background,
    });
  }
}
