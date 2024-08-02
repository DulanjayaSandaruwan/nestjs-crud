import { Body, Controller, Post } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/CreatePostDTO.dto";

@Controller('posts')
export class PostsController {

    constructor(
        private postService: PostsService) {
    }

    @Post()
    createPost(@Body() createPostDto: CreatePostDto) {
        return this.postService.createPost(createPostDto);
    }
}