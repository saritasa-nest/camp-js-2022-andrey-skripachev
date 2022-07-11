import { PaginationDto } from '../dtos/pagination.dto';

import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

  /**
   * Maps dto to model.
   * @param dto Pagination dto.
   */
  export function fromDto(dto: PaginationDto): Pagination {
    const { count, limit, offset } = dto;
    const totalPages = Math.ceil(count / limit);
    const currentPage = Math.ceil(offset / limit);
    return new Pagination({ totalPages, currentPage });
  }
}
