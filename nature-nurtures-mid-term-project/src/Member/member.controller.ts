import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { MemberService } from "./member.service";
import { MemberDTO } from "./member.dto";

@Controller('member')
export class MemberController {
    constructor(private readonly memberService: MemberService) {}
    @Post('/profiledetails')
    @UsePipes(new ValidationPipe)
    getProfileDetails(@Body() profileDetails: MemberDTO): string {
        console.log(profileDetails);
        return this.memberService.getProfileDetails(profileDetails);
    }
}