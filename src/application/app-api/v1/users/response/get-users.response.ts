import { ApiProperty } from '@nestjs/swagger';

export class GetUsersResponse {
  @ApiProperty({ example: 1, description: 'Unique identifier of the user' })
  id: number;

  @ApiProperty({ example: 'test', description: 'Username of the user' })
  username: string;

  @ApiProperty({ example: 'test', description: 'Password of the user' })
  password: string;
}