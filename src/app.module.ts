import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@modules/users/users.module';
import { ApiLoggerMiddleware } from '@common/middleware/api-logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({cache: true, isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DB_URL,
      synchronize: false,
      autoLoadEntities: true,
      entities: [User],
    }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiLoggerMiddleware)
      .forRoutes('*');
  }
}
