import { ResultCode } from './result.code';
import { ResultMessages } from './result.messages';
import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
  @ApiProperty({ enum: ResultCode, example: ResultCode.SUCCESS, description: 'The result code of the response' })
  public readonly resultCode: ResultCode;

  @ApiProperty({ example: ResultMessages[ResultCode.SUCCESS], description: 'A message describing the result', required: false })
  public readonly message?: string;

  public data?: T;

  public error?: string;

  constructor(
    resultCode: ResultCode,
    message?: string,
    data?: T,
    error?: string
  ) {
    this.resultCode = resultCode;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  static success<T>(data?: T): ApiResponse<T> {
    return new ApiResponse<T>(ResultCode.SUCCESS, ResultMessages[ResultCode.SUCCESS], data);
  }

  static error<T>(errorCode: ResultCode): ApiResponse<T> {
    const errorMessage: string | undefined = ResultMessages[errorCode];
    if(!errorMessage) {
      console.error(`Unknown error code encountered: ${errorCode}`);
      return new ApiResponse<T>(ResultCode.ERR_FAIL, `Unknown error code encountered: ${errorCode}`, undefined, errorCode);
    }

    return new ApiResponse<T>(errorCode, undefined, undefined, errorMessage);
  }
}
