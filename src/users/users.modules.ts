import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { 
    User, 
    userSchema 
} from "src/schemas/User.schema";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";
import {
    UserSettings,
    userSettingsSchema,
  } from 'src/schemas/UserSettings.schema';
import { postSchema } from "src/schemas/Post.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
        {
            name: 'User',
            schema: userSchema,
        },
        {
            name: 'UserSettings',
            schema: userSettingsSchema
        },
        {
            name: 'Post',
            schema: postSchema,
        }
    ])
    ],
    providers: [
        UserService
    ],
    controllers: [
        UserController
    ]
})
export class UserModule {}