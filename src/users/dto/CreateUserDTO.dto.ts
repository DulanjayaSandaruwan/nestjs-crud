import { Type } from "class-transformer";
import { 
    IsBoolean,
    IsNotEmpty, 
    IsOptional, 
    IsString, 
    ValidateNested
} from "class-validator";

export class CreateUserSettingsDTO {
    @IsOptional()
    @IsBoolean()
    receiveNotifications?: boolean;

    @IsOptional()
    @IsBoolean()
    receiveEmails?: boolean;

    @IsOptional()
    @IsBoolean()
    receiveSMS?: boolean;   
}

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateUserSettingsDTO)
    settings?: CreateUserSettingsDTO;

}