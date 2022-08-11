import { AnimeDetailsDto } from "../dtos/anime-details.dto";
import { AnimeDetails } from "../models/anime-details";
import { mapAnimeStatusToDto } from "./anime-status.mapper";
import { mapAnimeTypeToDto } from "./anime-type.mapper";
import { AnimeMapper } from "./anime.mapper";
import { DateTimeRangeMapper } from "./date-time-range.mapper";
import { GenreMapper } from "./genre.mapper";
import { StudioMapper } from "./studio.mapper";

export namespace AnimeDetailsMapper {
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
    })
  }

  export function toDto(model: AnimeDetails): AnimeDetailsDto {
    return {
      ...AnimeMapper.toDto(model),
      trailer_youtube_id: model.trailerYoutubeId,
      synopsis: model.synopsis,
      airing: model.isAiring,
      studios: model.studiosIdList,
      genres: model.genresIdList,
      studios_data: model.studiosData,
      genres_data: model.genresData,
      source: model.source || 'UNKNOWN',
      rating: model.rating || 'UNKNOWN',
      season: model.season || 'NON_SEASONAL',
      background: model.background,
    }
  }

  // export function toDto(model: AnimeDetailsRequest): AnimeDetailsRequestDto {
  //   return {
  //     trailer_youtube_id: model.trailerYoutubeId,
  //     synopsis: model.synopsis,
  //     airing: model.isAiring,
  //     studios: model.studiosIdList,
  //     genres: model.genresIdList,
  //     aired: DateTimeRangeMapper.toDto(model.aired),
  //     image: model.image,
  //     status: mapAnimeStatusToDto(model.status),
  //     title_eng: model.titleEnglish,
  //     title_jpn: model.titleJapanese,
  //     type: mapAnimeTypeToDto(model.type),
  //   }
  // }
}
