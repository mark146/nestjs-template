import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUsersRequest } from './request/get-users.request';
import { ApiDoc } from '@/core/decorators/api-doc.decorator';
import { GetUsersResponse } from './response/get-users.response';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@/core/response/api-response';
import { CreateUserRequest } from '@/application/app-api/v1/users/request/create-user.request';

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
    isPaginated: true,
  })
  async getUsers(
    @Query() request: GetUsersRequest,
  ): Promise<ApiResponse<any>> {
    const { data, meta } = await this.userService.getUsers(GetUsersRequest.toService(request));
    return ApiResponse.success(data, meta);
  }

  @Post()
  @ApiDoc({
    summary: '유저 생성',
  })
  async createUser(@Body() request: CreateUserRequest): Promise<any> {
    return ApiResponse.success(
      await this.userService.createUser(CreateUserRequest.toService(request))
    );
  }
}
