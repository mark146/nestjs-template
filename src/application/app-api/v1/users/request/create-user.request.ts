import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequest {
  @ApiProperty({ required: true, example: 'test' })
  username: string;

  @ApiProperty({ required: true, example: 'testPassword' })
  password: string;

  static toService(request: CreateUserRequest): any {
    const { username, password } = request;

    return {
      username,
      password,
    };
  }
}
