import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { MemberService } from "./member.service";
import { EditMemberDTO, MemberDTO } from "./member.dto";

@Controller('member')
export class MemberController {
    constructor(private readonly memberService: MemberService) {}
    @Post('/profiledetails')
    @UsePipes(new ValidationPipe)
    getProfileDetails(@Body() profileDetails: MemberDTO): string {
        console.log(profileDetails);
        return this.memberService.getProfileDetails(profileDetails);
    }
    @Put('editprofiledetails')
    editProfileDetails(@Query() query:EditMemberDTO, @Body() profileDetails: MemberDTO): string {
        return this.memberService.editProfileDetails(query, profileDetails);
    }
}