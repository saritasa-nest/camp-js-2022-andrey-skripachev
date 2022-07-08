import { PaginationDto } from '../dtos/pagination.dto';

import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

  export function fromDto({ count, limit, offset }: PaginationDto): Pagination {
    const totalPages = Math.ceil(count / limit);
    const currentPage = Math.ceil(offset / limit);
    return new Pagination({ totalPages, currentPage });
  }
}
