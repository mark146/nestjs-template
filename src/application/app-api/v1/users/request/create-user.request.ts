import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequest {
  @ApiProperty({ example: 'test' })
  username: string;

  @ApiProperty({ example: 'testPassword' })
  password: string;

  static toService(request: CreateUserRequest): any {
    return {
      ...request,
    };
  }
}
