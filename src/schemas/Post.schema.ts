import { 
    Prop, 
    Schema, 
    SchemaFactory
} from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./User.schema";

@Schema()
export class Post {
    
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    contents: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const postSchema = SchemaFactory.createForClass(Post);