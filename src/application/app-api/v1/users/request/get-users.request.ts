import { ApiProperty } from '@nestjs/swagger';

export class GetUsersRequest {
  @ApiProperty({ default: 1, required: false, minimum: 1 })
  page?: number;

  @ApiProperty({ default: 20, required: false, minimum: 1, maximum: 100 })
  limit?: number;

  constructor() {
    this.page = this.page ?? 1;
    this.limit = this.limit ?? 20;
  }

  static toService(request: GetUsersRequest): any {
    const { page, limit } = request;
    return {
      page,
      limit
    };
  }
}