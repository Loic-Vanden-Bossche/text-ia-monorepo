import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CharacterModule } from './character/character.module';
import { DialogModule } from './dialog/dialog.module';

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
  ), CharacterModule, DialogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
