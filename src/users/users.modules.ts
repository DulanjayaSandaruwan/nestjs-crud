import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { 
    User, 
    userSchema 
} from "src/schemas/User.schema";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'User',
            schema: userSchema,
            collection: 'users'
        }])
    ],
    providers: [
        UserService
    ],
    controllers: [
        UserController
    ]
})
export class UserModule {}