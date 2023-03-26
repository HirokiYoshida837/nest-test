import { IsNotEmpty, MaxLength } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    // @MaxLength(255)
    // @IsNotEmpty()
    // name: string;

}