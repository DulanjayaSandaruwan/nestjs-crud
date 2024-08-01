import { 
    Schema, 
    Prop, 
    SchemaFactory 
} from "@nestjs/mongoose";

@Schema()
export class User {

    @Prop({ required: true })
    name: string;

    @Prop({ unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false })
    avatarUrl: string;
}

export const userSchema = SchemaFactory.createForClass(User);