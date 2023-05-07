import BadRequestDto from '@app/common/dto/bad-request.dto';
import { applyDecorators, Type, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import InternalServerErrorDto from '../dto/internal-serve-error.dto';
import NotFoundDTO from '../dto/not-found.dto';

export const GetEndpoint = (summary: string, outputDto: Type<any>, entityType: Type<any>) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({
      description: 'Entity returned successfully',
      type: outputDto,
    }),
    ApiBadRequestResponse({
      description: 'Invalid params',
      type: BadRequestDto,
    }),
    ApiInternalServerErrorResponse({
      description: 'Server Internal Error',
      type: InternalServerErrorDto,
    }),
    ApiNotFoundResponse({
      description: 'Entity not found',
      type: NotFoundDTO,
    }),
    UseInterceptors(outputDto, entityType),
  );
