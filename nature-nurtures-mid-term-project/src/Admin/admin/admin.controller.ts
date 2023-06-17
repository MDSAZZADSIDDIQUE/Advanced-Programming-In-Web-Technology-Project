/* eslint-disable prettier/prettier */
import { Controller, Get} from '@nestjs/common';
import { AdminService } from './admin.service';
@Controller('/admin')
export class AdminController {
  constructor(private readonly adminUse: AdminService) {}

  @Get('/shafin')
  getAdmin(): string {
    return this.adminUse.getAdmin();
  }
}
