import { Injectable } from "@nestjs/common";
import { EditMemberDTO, MemberDTO } from "./member.dto";

@Injectable()
export class MemberService{
    getProfileDetails(profileDetails: MemberDTO): string {
        const now = new Date();
        const milliseconds = now.getTime();
        const id = milliseconds.toString();
        return (`
        Profile Details
        ---------------
        ID: ${id}
        Name: ${profileDetails.firstName} ${profileDetails.lastName}
        Date of Birth: ${profileDetails.dateOfBirth}
        Address: ${profileDetails.address}
        Username: ${profileDetails.username}
        Telephone Number: ${profileDetails.telephoneNumber}
        Email: ${profileDetails.email}
        ---------------
        `);
    }

    editProfileDetails(query: EditMemberDTO, profileDetails: MemberDTO)
    {
        const editKey = query.editKey;
        const ediValue = query.editValue;
        for (const key in profileDetails) {
            if (key === editKey) {
                profileDetails[key] = ediValue;
            }
        }
        return (`
        Profile Details
        ---------------
        Name: ${profileDetails.firstName} ${profileDetails.lastName}
        Date of Birth: ${profileDetails.dateOfBirth}
        Address: ${profileDetails.address}
        Username: ${profileDetails.username}
        Telephone Number: ${profileDetails.telephoneNumber}
        Email: ${profileDetails.email}
        ---------------
        `);
    }
    
}