import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AdminControllerdup } from './admindup.controller';
import { ParamController } from './param.controller';
import { QueryController } from './query.controller';
import { BodyController } from './body.controller';
import { dtocontroller } from './dto.controller';

@Module({
  imports: [],
  controllers: [
    UserController,
    AdminControllerdup,
    ParamController,
    QueryController,
    BodyController,
    dtocontroller,
  ],
  providers: [],
})
export class AppModule {}
