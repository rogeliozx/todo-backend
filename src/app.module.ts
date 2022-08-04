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
    MongooseModule.forRoot(
      `mongodb+srv://rogelioltz:${encodeURIComponent(
        'Naruto01',
      )}@cluster0.oxzcg.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: false,
      },
    ),
    UsersModule,
    TodoAppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
