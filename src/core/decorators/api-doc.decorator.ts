import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ResultCode } from '@/core/response/result-code';
import { ResultMessages } from '@/core/response/result-messages';

interface ApiDocOptions<T extends Type<any>, IsPaginated extends boolean> {
  type?: T | null;
  isPaginated?: IsPaginated;
  summary?: string;
  description?: string;
  status?: number;
}

export function ApiDoc<T extends Type<any>, IsPaginated extends boolean>(
  options: ApiDocOptions<T, IsPaginated>
) {
  const {
    type = null,
    isPaginated = false,
    summary = "API Operation",
    description = 'Successfully retrieved data',
    status = HttpStatus.OK
  } = options;

  const decorators = [
    ApiOperation({ summary }),
    ApiResponse({
      status,
      description,
      schema: {
        type: 'object',
        properties: {
          resultCode: { type: 'string', enum: Object.values(ResultCode), example: ResultCode.SUCCESS },
          message: { type: 'string', example: ResultMessages[ResultCode.SUCCESS] },
          ...(type && {
            data: isPaginated
              ? {
                type: 'array',
                items: { $ref: getSchemaPath(type) },
              }
              : { $ref: getSchemaPath(type) },
          }),
          ...(isPaginated && {
            meta: {
              type: 'object',
              properties: {
                total: { type: 'number', example: 23 },
                page: { type: 'number', example: 0 },
                limit: { type: 'number', example: 5 },
                totalPages: { type: 'number', example: 5 },
              },
            },
          }),
        },
      },
    })
  ];

  if (type) {
    decorators.push(ApiExtraModels(type));
  }

  return applyDecorators(...decorators);
}