import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUsersRequest {
  private static readonly DEFAULT_PAGE = 1;
  private static readonly DEFAULT_LIMIT = 20;
  private static readonly MAX_LIMIT = 100;
  private static readonly MIN_LIMIT = 1;

  @ApiProperty({
    description: '페이지 번호 (1부터 시작)',
    default: GetUsersRequest.DEFAULT_PAGE,
    required: false,
    minimum: GetUsersRequest.DEFAULT_PAGE,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiProperty({
    description: '페이지당 항목 수',
    default: GetUsersRequest.DEFAULT_LIMIT,
    required: false,
    minimum: GetUsersRequest.MIN_LIMIT,
    maximum: GetUsersRequest.MAX_LIMIT
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(GetUsersRequest.MIN_LIMIT)
  @Max(GetUsersRequest.MAX_LIMIT)
  limit?: number;

  static toService(request: GetUsersRequest): any {
    const normalizedPage = request.page !== undefined
      ? Math.max(this.DEFAULT_PAGE, request.page)
      : this.DEFAULT_PAGE;

    const normalizedLimit = request.limit !== undefined
      ? Math.max(this.MIN_LIMIT, Math.min(this.MAX_LIMIT, request.limit))
      : this.DEFAULT_LIMIT;

    return {
      page: normalizedPage,
      limit: normalizedLimit
    };
  }
}