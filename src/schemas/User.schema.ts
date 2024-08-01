import { 
    Schema, 
    Prop, 
    SchemaFactory 
} from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserSettings } from "./UserSettings.schema";

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

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
    settings?: UserSettings;
}

export const userSchema = SchemaFactory.createForClass(User);