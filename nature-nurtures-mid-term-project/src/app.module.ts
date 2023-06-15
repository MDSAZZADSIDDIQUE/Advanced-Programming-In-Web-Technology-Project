import { Module } from '@nestjs/common';
import { MemberModule } from './Member/member.module';

@Module({
  imports: [MemberModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
