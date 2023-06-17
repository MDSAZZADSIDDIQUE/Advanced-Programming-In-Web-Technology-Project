/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
@Injectable()
export class AdminService {
  getAdmin(): string {
    return 'hello shafin';
  }
}
