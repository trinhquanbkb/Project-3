import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hashSync } from 'bcrypt';
import { Document } from 'mongoose';
import { configs } from 'src/config/configuration';

export type UserDocument = User & Document;

@Schema({
  timestamps: true
})
export class User {

  @Prop({
    required: true,
    type: String,
  })
  username: string;

  @Prop({
    required: false,
    type: String,
    default: hashSync('12345678', configs.saltOrRound),
  })
  password?: string;
  
  @Prop({
    required: false,
    type: Array,
    default: ['ADMIN'],
  })
  role: Array<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);
