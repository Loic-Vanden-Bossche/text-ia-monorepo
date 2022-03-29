import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [UserModule, AuthModule, MessageModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'ia-text-chat',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
