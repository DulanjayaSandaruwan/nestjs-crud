import { 
    Schema, 
    Prop, 
    SchemaFactory 
} from "@nestjs/mongoose";

@Schema()
export class UserSettings {

    @Prop({ required: false })
    receiveNotification?: boolean;

    @Prop({ required: false })
    receiveEmails?: boolean;

    @Prop({ required: false })
    receiveSMS?: boolean;
}

export const userSettingsSchema = SchemaFactory.createForClass(UserSettings);