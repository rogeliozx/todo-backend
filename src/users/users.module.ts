import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { jwtConfig } from '../config/jwt';
import { JwtStrategy } from './Jwt.stategy';
// Mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/User';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
})
export class UsersModule {}
