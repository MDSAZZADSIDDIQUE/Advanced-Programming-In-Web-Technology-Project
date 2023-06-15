import { IsDateString, IsNotEmpty, IsString, Matches, MaxLength, MinLength, IsEmail } from "class-validator";

export class MemberDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @Matches(/^[A-Za-z]+$/)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @Matches(/^[A-Za-z]+$/)
    lastName: string;

    @IsNotEmpty()
    @IsDateString()
    dateOfBirth: Date;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    address: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(14)
    @MaxLength(14)
    telephoneNumber: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}

export class EditMemberDTO {
    editKey: string;
    editValue: string;
}