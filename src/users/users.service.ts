import { 
    Injectable, 
    Logger, 
    NotFoundException 
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { CreateUserDTO } from "./dto/CreateUserDTO.dto";
import { UpdateUserDTO } from "./dto/UpdateUserDTO.dto";

@Injectable()
export class UserService {
    
    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {

    }

    createUser(createUserDTO: CreateUserDTO) {
        this.logger.log('Creating a new user...');
        const newUser = new this.userModel(createUserDTO);
        return newUser.save();
    }

    getUsers() {
        return this.userModel.find().exec();
    }

    async getUserById(id: string) {
        const userId = mongoose.Types.ObjectId.isValid(id);
        if (!userId) {
            throw new NotFoundException(`Invalid user ID "${id}".`);
        }
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException(`User with ID "${id}" not found.`);
        }
        return user;
    }
    
    async updateUser(id: string, updateUserDTO: UpdateUserDTO) {
        const userId = await this.getUserById(id);
        return this.userModel.findByIdAndUpdate(userId, updateUserDTO, { new: true }).exec();
    }
    
}