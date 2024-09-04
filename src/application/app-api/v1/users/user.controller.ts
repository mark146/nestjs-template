import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUsersRequest } from './request/get-users.request';
import { ApiDoc } from '@/core/decorators/api-doc.decorator';
import { GetUsersResponse } from './response/get-users.response';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@/core/response/api-response';

@Controller('v1/users')
@ApiTags('v1/users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  @ApiDoc({
    type: GetUsersResponse,
    summary: '유저 목록 조회',
  })
  async getUsers(
    @Query() request: GetUsersRequest,
  ): Promise<ApiResponse<any>> {
    const { data, meta } = await this.userService.getUsers(GetUsersRequest.toService(request));
    return ApiResponse.success(data, meta);
  }
}
