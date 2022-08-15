import { AnimeStatusDto } from '../dtos/anime.dto';
import { AnimeStatus } from '../utils/types/animeStatus';

const STATUS_FROM_DTO: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
  [AnimeStatusDto.AIRING]: AnimeStatus.Airing,
  [AnimeStatusDto.FINISHED]: AnimeStatus.Finished,
  [AnimeStatusDto.NOT_YET_AIRED]: AnimeStatus.NotYetAired,
};

/**
 * Maps anime status from dto.
 * @param statusDto Status dto.
 */
export function mapAnimeStatusFromDto(statusDto: AnimeStatusDto): AnimeStatus {
  return STATUS_FROM_DTO[statusDto];
}

const STATUS_TO_DTO: Readonly<Record<AnimeStatus, AnimeStatusDto>> = {
  [AnimeStatus.Airing]: AnimeStatusDto.AIRING,
  [AnimeStatus.Finished]: AnimeStatusDto.FINISHED,
  [AnimeStatus.NotYetAired]: AnimeStatusDto.NOT_YET_AIRED,
};

/**
 * Maps anime status to dto.
 * @param status Status.
 */
export function mapAnimeStatusToDto(status: AnimeStatus): AnimeStatusDto {
  return STATUS_TO_DTO[status];
}
