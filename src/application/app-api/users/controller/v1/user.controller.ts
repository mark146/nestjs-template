import { Controller, Get } from '@nestjs/common';
import { UserService } from '../../service/user.service';
import { ApiResponse } from 'src/core/response/api.response';

@Controller({
  path: 'users',
  version: '1'
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<ApiResponse<string>> {
    return this.userService.getUsers();
  }
}
