import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { postSchema } from "src/schemas/Post.schema";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { userSchema } from "src/schemas/User.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Post',
                schema: postSchema,
            },
            {
                name: 'User',
                schema: userSchema,
            }
        ])
    ],
    controllers: [
        PostsController
    ],
    providers: [
        PostsService
    ]
})
export class PostsModule {

}