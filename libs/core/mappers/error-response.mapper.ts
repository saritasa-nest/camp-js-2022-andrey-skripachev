import { ErrorResponseDto } from '../dtos/error-response.dto';
import { ErrorResponse } from '../models/error-response';

export namespace ErrorResponseMapper {

  /**
   * Maps error response.
   * @param dto Error dto.
   * @param mapper Error mapper.
   */
  export function fromDto<TErrorDto extends ErrorResponseDto<TErrorDto>, TError extends ErrorResponse<TError>>(
    dto: TErrorDto,
    mapper: (dto: TErrorDto) => TError,
  ): ErrorResponse<TError> {
    return new ErrorResponse({
      data: mapper(dto),
      detail: dto.detail,
    });
  }
}
