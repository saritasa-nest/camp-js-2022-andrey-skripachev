import { AnimeStatusDto } from '../dtos/anime.dto';
import { EnumMapper } from '../enums/enums';
import { AnimeStatus } from '../utils/types/animeStatus';

export const MAP_STATUS_FROM_DTO: EnumMapper<AnimeStatusDto, AnimeStatus> = {
  [AnimeStatusDto.AIRING]: AnimeStatus.Airing,
  [AnimeStatusDto.FINISHED]: AnimeStatus.Finished,
  [AnimeStatusDto.NOT_YET_AIRED]: AnimeStatus.NotYetAired,
};
