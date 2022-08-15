import { ErrorResponseDto } from '../dtos/error-response.dto';
import { ErrorResponse } from '../models/error-response';

export namespace ErrorResponseMapper {

  export function fromDto<TErrorDto, TError>(dto: ErrorResponseDto<TErrorDto>, mapper: (dto: TErrorDto) => TError): ErrorResponse<TError> {
    return new ErrorResponse<TError>({
      data: mapper(dto.data),
      detail: dto.detail,
    });
  }
}
