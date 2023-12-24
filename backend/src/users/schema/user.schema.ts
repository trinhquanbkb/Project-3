import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hashSync } from 'bcrypt';
import { Document } from 'mongoose';
import { configs } from 'src/config/configuration';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    type: String,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
  })
  username: string;

  @Prop({
    required: true,
    type: String,
  })
  phone: string;

  @Prop({
    required: false,
    type: String,
  })
  parent_id: string;

  @Prop({
    required: false,
    type: String,
    default: hashSync('123456', configs.saltOrRound),
  })
  password: string;

  @Prop({
    required: true,
    type: String,
  })
  role_id: string;

  @Prop({
    required: true,
    type: String,
  })
  warehouse_id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
