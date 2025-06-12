import { Module } from '@nestjs/common';

@Module({
  providers: [AuthModule],
  exports: [AuthModule],
})
export class AuthModule {}
