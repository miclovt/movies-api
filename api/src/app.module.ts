import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeedModule } from './modules/seed/seed.module';
import { UserModule } from './modules/user/user.module';
import { MovieModule } from './modules/movie/movie.module';
import { RateModule } from './modules/rate/rate.module';
import { ActorModule } from './modules/actor/actor.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    MovieModule,
    RateModule,
    UserModule,
    ActorModule,
    SeedModule,
    AuthModule,
  ],
})
export class AppModule {}
