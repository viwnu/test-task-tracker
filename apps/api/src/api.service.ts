import { HelloResponse } from '@app/contracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  getHello(): HelloResponse {
    return { message: 'Hello from Nest API 👋' };
  }
}
