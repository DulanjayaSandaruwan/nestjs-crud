import { 
    IsNotEmpty, 
    IsOptional, 
    IsString 
} from "class-validator";

export class UpdateUserDTO {
    @IsOptional()
    name?: string;

    @IsOptional()
    email?: string;

    @IsOptional()
    password?: string;
}