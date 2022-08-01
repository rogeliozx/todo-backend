import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true, default: false })
  complete: boolean;

  @Prop({ default: Date.now() })
  timeStamp: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
