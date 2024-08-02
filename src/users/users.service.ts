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
import { UserSettings } from "src/schemas/UserSettings.schema";

@Injectable()
export class UserService {
    
    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>
    ) {

    }

    async createUser({ settings, ...createUserDTO }: CreateUserDTO) {
        this.logger.log('Creating a new user...');
        if (settings) {
            const newSettings = new this.userSettingsModel(settings);
            const savedNewSettings = await newSettings.save();
            const newUser = new this.userModel({
                ...createUserDTO,
                settings: savedNewSettings._id,
            });
            return newUser.save();
        }
        const newUser = new this.userModel(createUserDTO);
        return newUser.save();
    }

    getUsers() {
        this.logger.log('Getting all user...');
        return this.userModel.find().populate(['settings', 'posts']);
    }

    async getUserById(id: string) {
        this.logger.log('Getting user by ID...');
        const userId = mongoose.Types.ObjectId.isValid(id);
        if (!userId) {
            throw new NotFoundException(`Invalid user ID "${id}".`);
        }
        const user = (await this.userModel.findById(id).exec()).populate(['settings', 'posts']);
        if (!user) {
            throw new NotFoundException(`User with ID "${id}" not found.`);
        }
        return user;
    }
    
    async updateUser(id: string, updateUserDTO: UpdateUserDTO) {
        this.logger.log('Updating user...');
        const userId = await this.getUserById(id);
        return this.userModel.findByIdAndUpdate(userId, updateUserDTO, { new: true }).exec();
    }
    
}