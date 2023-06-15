import { Injectable } from "@nestjs/common";
import { MemberDTO } from "./member.dto";

@Injectable()
export class MemberService{
    getProfileDetails(profileDetails: MemberDTO): string {
        const firstName = profileDetails.firstName;
        const lastName = profileDetails.lastName;
        const dateOfBirth = profileDetails.dateOfBirth;
        const address = profileDetails.address;
        const username = profileDetails.username;
        const telephoneNumber = profileDetails.telephoneNumber;
        const email = profileDetails.email;
        const password = profileDetails.password;
        return (`
        Profile Details
        ---------------
        Name: ${firstName} ${lastName}
        Date of Birth: ${dateOfBirth}
        Address: ${address}
        Username: ${username}
        Telephone Number: ${telephoneNumber}
        Email: ${email}
        ---------------
        `);
    }
}