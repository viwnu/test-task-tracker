import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import { HelloResponse } from '@app/contracts';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('hello')
  getHello(): HelloResponse {
    return this.apiService.getHello();
  }
}
