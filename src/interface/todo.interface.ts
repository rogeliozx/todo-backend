import { Document } from 'mongoose';

export interface Todo extends Document {
  readonly owner: string;
  readonly text: string;
  readonly complete: boolean;
  readonly timeStamp: Date;
}
