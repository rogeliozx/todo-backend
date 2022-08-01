import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TodoAppModule } from './todo-app/todo-app.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost:27017/TodoApp', {
      useNewUrlParser: true,
    }),
    UsersModule,
    TodoAppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
