import { ApiProperty } from '@nestjs/swagger';

export class PaginationMeta {
  @ApiProperty({ example: 23, description: 'Total number of items' })
  total: number;

  @ApiProperty({ example: 0, description: 'Current page number' })
  page: number;

  @ApiProperty({ example: 5, description: 'Number of items per page' })
  limit: number;

  @ApiProperty({ example: 5, description: 'Total number of pages' })
  totalPages: number;
}