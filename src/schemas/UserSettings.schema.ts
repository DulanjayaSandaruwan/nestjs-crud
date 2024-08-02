import { 
    Schema, 
    Prop, 
    SchemaFactory 
} from "@nestjs/mongoose";

@Schema()
export class UserSettings {

    @Prop({ required: false })
    receiveNotifications?: boolean;

    @Prop({ required: false })
    receiveEmails?: boolean;

    @Prop({ required: false })
    receiveSMS?: boolean;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const userSettingsSchema = SchemaFactory.createForClass(UserSettings);