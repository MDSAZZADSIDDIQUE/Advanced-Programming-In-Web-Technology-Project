import { Injectable } from "@nestjs/common";
import { EditMemberDTO, MemberDTO } from "./member.dto";
import { orderDTO } from "./order.dto";

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

    addOrder(query: orderDTO, orders: object) {
        let seeOrders = "";
        let numberOfOrder = Object.keys(orders).length;
        let newQuery = { [numberOfOrder + 1] : query};
        let ordersDetails = Object.assign(orders, newQuery);
        for (const key in orders) {
            seeOrders += (`
            --------------------------------------------------
            Order ID: ${key}
            Product ID: ${ordersDetails[key].productID}
            Product Name: ${ordersDetails[key].productName}
            Quantity: ${ordersDetails[key].quantity}
            Price: ${ordersDetails[key].price}
            Shipping Address: ${ordersDetails[key].shippingAddress}
            --------------------------------------------------
            `);
        }
        return seeOrders;
    }

    cancelOrder(orderID: string, orders: object) {
        let seeOrders = "";
        for (const key in orders) {
            if (key == orderID) {
                continue;
            }
            seeOrders += (`
            --------------------------------------------------
            Order ID: ${key}
            Product ID: ${orders[key].productID}
            Product Name: ${orders[key].productName}
            Quantity: ${orders[key].quantity}
            Price: ${orders[key].price}
            Shipping Address: ${orders[key].shippingAddress}
            --------------------------------------------------
            `);
        }
        return seeOrders;
    }
    
}