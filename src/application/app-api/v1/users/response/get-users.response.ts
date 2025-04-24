import { ApiProperty } from '@nestjs/swagger';
import { User } from '@/domain/v1/user/user.domain';

export class GetUsersResponse {
  @ApiProperty({
    description: '사용자 ID',
    example: '1'
  })
  id: string;

  @ApiProperty({
    description: '사용자명',
    example: 'user123'
  })
  username: string;

  static fromDomain(user: User): GetUsersResponse {
    const dto = new GetUsersResponse();
    if (user.getId()) {
      dto.id = user.getId().toString();
    }
    dto.username = user.getUsername();

    return dto;
  }
}