import { Module } from '@nestjs/common';
import { TodoAppController } from './todo-app.controller';
import { TodoAppService } from './todo-app.service';
// Mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from '../schemas/Todo';
import { JwtStrategy } from 'src/users/Jwt.stategy';
import { jwtConfig } from '../config/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [TodoAppController],
  providers: [TodoAppService, JwtStrategy],
})
export class TodoAppModule {}
