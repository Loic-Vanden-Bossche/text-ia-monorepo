import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CharacterModule } from './character/character.module';
import { DialogModule } from './dialog/dialog.module';
import {ConfigModule} from "@nestjs/config";
import { ContextModule } from './context/context.module';

@Module({
  imports: [UserModule, AuthModule, MessageModule, ConfigModule.forRoot({isGlobal: true, envFilePath: ['../../.env']}), TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: process.env.DEV ? false : { rejectUnauthorized: false },
      synchronize: true,
    }
  ), CharacterModule, DialogModule, ContextModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
