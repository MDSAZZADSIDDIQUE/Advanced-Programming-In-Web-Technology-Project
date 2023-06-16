import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UsePipes, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { MemberService } from "./member.service";
import { EditMemberDTO, MemberDTO } from "./member.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";

@Controller('member')
export class MemberController {
    constructor(private readonly memberService: MemberService) {}
    @Post('/profiledetails')
    @UsePipes(new ValidationPipe)
    getProfileDetails(@Body() profileDetails: MemberDTO): string {
        return this.memberService.getProfileDetails(profileDetails);
    }
    @Put('/editprofiledetails')
    editProfileDetails(@Query() query:EditMemberDTO, @Body() profileDetails: MemberDTO): string {
        return this.memberService.editProfileDetails(query, profileDetails);
    }
    @Post('/uploadprofilepicture')
    @UseInterceptors(FileInterceptor('profilePicture',
    { fileFilter(req, file, callback) {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
            callback(null, true);
        } else {
            callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false)
        }
    },
    limits: { fileSize: 1000000 },
    storage:diskStorage({
        destination: './profile_pictures',
        filename(req, file, callback) {
            callback(null, Date.now() + file.originalname)
        },
    })
    }))
    uploadProfilePicture(@UploadedFile() profilePicture: Express.Multer.File): string {
        return (`
        Name: ${profilePicture.filename}
        Size: ${profilePicture.size}
        Profile Picture Uploaded.
        `);
    }
}