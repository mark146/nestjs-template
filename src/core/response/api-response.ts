import { ResultCode } from './result-code';
import { ResultMessages } from './result-messages';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationMeta } from './pagination-meta';

export class ApiResponse<T> {
  @ApiProperty({ enum: ResultCode, example: ResultCode.SUCCESS, description: 'The result code of the response' })
  public readonly code: ResultCode;

  @ApiProperty({ example: ResultMessages[ResultCode.SUCCESS], description: 'A message describing the result', required: false })
  public readonly message?: string;

  @ApiProperty({ description: 'The main data payload of the response', required: false })
  public data?: T;

  @ApiProperty({ description: 'Error message in case of failure', required: false })
  public error?: string;

  @ApiProperty({ description: 'Pagination metadata', required: false })
  public meta?: PaginationMeta;

  constructor(
    resultCode: ResultCode,
    message?: string,
    data?: T,
    error?: string,
    meta?: PaginationMeta
  ) {
    this.code = resultCode;
    this.message = message;
    this.data = data;
    this.error = error;
    this.meta = meta;
  }

  static success<T>(data?: T, meta?: PaginationMeta): ApiResponse<T> {
    return new ApiResponse<T>(ResultCode.SUCCESS, ResultMessages[ResultCode.SUCCESS], data, undefined, meta);
  }

  static error<T>(errorCode: ResultCode): ApiResponse<T> {
    const errorMessage = ResultMessages[errorCode];
    if(!ResultMessages[errorCode]) {
      return new ApiResponse<T>(ResultCode.ERR_FAIL, undefined, undefined, errorCode);
    } else {
      return new ApiResponse<T>(errorCode, undefined, undefined, errorMessage);
    }
  }
}