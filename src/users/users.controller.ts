import { 
    Body, 
    Controller, 
    Get, 
    Param, 
    Post, 
    UsePipes, 
    ValidationPipe 
} from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDTO } from "./dto/CreateUserDTO.dto";
import { UpdateUserDTO } from "./dto/UpdateUserDTO.dto";

@Controller('users')
export class UserController {

    constructor(
        private userService: UserService) {
    }

    @Post('create-user')
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDTO: CreateUserDTO) {
        return this.userService.createUser(createUserDTO);
    }

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    @Post(':id')
    @UsePipes(new ValidationPipe())
    async updateUser(
        @Param('id') id: string, 
        @Body() updateUserDTO: UpdateUserDTO
    ) {
        return await this.userService.updateUser(id, updateUserDTO);
    }
}