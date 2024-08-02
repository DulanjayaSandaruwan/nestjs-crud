import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Post } from "src/schemas/Post.schema";
import { CreatePostDto } from "./dto/CreatePostDTO.dto";
import { User } from "src/schemas/User.schema";

@Injectable()
export class PostsService {
    
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
        @InjectModel(User.name) private userModel: Model<User>
    ) {

    }

    async createPost({ userId, ...createPostDto }: CreatePostDto) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException(`User with ID "${userId}" not found.`);
        }
        const newPost = new this.postModel(createPostDto);
        const savedPost = await newPost.save();
        await user.updateOne({ $push: {
                posts: savedPost._id
            }
        });
        return savedPost;
    }

    async findPostById(id: number) {
        // this.logger.log('Getting post by ID...');
        const postId = mongoose.Types.ObjectId.isValid(id);
        if (!postId) {
            throw new NotFoundException(`Invalid post ID "${id}".`);
        }
        const post = (await this.postModel.findById(id).exec());
        if (!post) {
            throw new NotFoundException(`User with ID "${id}" not found.`);
        }
        return post;
    }
}