import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UsePipes, UseInterceptors, ValidationPipe, Res, Delete } from "@nestjs/common";
import { MemberService } from "./member.service";
import { EditMemberDTO, MemberDTO } from "./member.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { orderDTO } from "./order.dto";

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
    @Post('/selectprofilepicture')
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
    selectProfilePicture(@UploadedFile() profilePicture: Express.Multer.File): string {
        return (`
        Name: ${profilePicture.filename}
        Size: ${profilePicture.size}
        Profile Picture Uploaded.
        `);
    }
    @Get('/seeprofilepicture/:profilePictureName')
    seeProfilePicture(@Param('profilePictureName') profilePictureName, @Res() response) {
        response.sendFile(profilePictureName, { root: './profile_pictures' });
    }
    @Post('/addorder')
    addOrder(@Query() query:orderDTO, @Body() orders: object): string {
        return this.memberService.addOrder(query, orders);
    }
    @Delete('/cancelorder/:orderID')
    cancelOrder(@Param('orderID') orderID:string, @Body() orders:object): string {
        return this.memberService.cancelOrder(orderID, orders);
    }
}