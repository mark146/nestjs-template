import { Injectable } from '@nestjs/common';
import { ApiResponse } from '../../../../core/response/api.response';

@Injectable()
export class UserService {

  async getUsers(): Promise<ApiResponse<string>>  {
    const result = 'Hello World!';
    return ApiResponse.success(result);
  }
}
