import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rogelioltz:Naruto01@cluster0.oxzcg.mongodb.net/test',
    ),
  ],
})
export class AppModule {}
