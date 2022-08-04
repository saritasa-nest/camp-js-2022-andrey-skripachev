import { ValidationErrorResponse } from '../models/validation-error-response';
import { ValidationErrorResponseDto } from '../dtos/validation-error-response.dto';

import { ValidationErrorsMapper } from './validation-errors.mapper';

export namespace ValidationErrorResponseMapper {

  export function fromDto(
    dto: ValidationErrorResponseDto,
  ): ValidationErrorResponse {
    return new ValidationErrorResponse({
      data: dto.data && ValidationErrorsMapper.fromDto(dto.data),
      detail: dto.detail,
    });
  }

}
