import { 
    Schema, 
    Prop, 
    SchemaFactory 
} from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserSettings } from "./UserSettings.schema";
import { Post } from "./Post.schema";

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

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
    settings?: UserSettings;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
    posts: Post[];
}

export const userSchema = SchemaFactory.createForClass(User);