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

    searchOrder(orderID: string, orders: object) {
        for (const key in orders) {
            if (key == orderID) {
                return (`
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
        }
    }
    searchPlantFertilizer(plantName: string, listOfPlantsAndTheirRequiredFertilizers: object) {
        for (const key in listOfPlantsAndTheirRequiredFertilizers) {
            if (key == plantName) {
                return (`
                --------------------------------------------------
                Plant Name: ${key}
                Plant Name: ${listOfPlantsAndTheirRequiredFertilizers[key]}
                --------------------------------------------------
                Here are some additional tips for fertilizing your plants:
                ⭐ Apply fertilizer when the soil is moist.
                ⭐ Do not over-fertilize, as this can damage the plants.
                ⭐ Water the plants thoroughly after fertilizing.
                ⭐ Fertilize regularly, according to the instructions on the fertilizer label.
                --------------------------------------------------
                `);
            }
        }
    }
    getNotificationForWater(): string {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        if (hour == 9) {
            return (`
            -------------------
            🌄 GOOD MORNING 🌄
            -------------------
            Time: ${hour}:${minute}:${second}
            -------------------
            🌱 It's time to 
            water your plants 🌱
            -------------------
            `)
        } else if (hour >= 12 && hour < 18) {
            return (`
            --------------------
            ☀️ GOOD AFTERNOON ☀️
            -------------------
            Time: ${hour}:${minute}:${second}
            --------------------
            😇 Don't forget to
            drink water 😇
            --------------------
            `)
        } else {
            return (`
            -----------------
            🌙 GOOD NIGHT 🌙
            -------------------
            Time: ${hour}:${minute}:${second}
            -----------------
            😇 Early to bed,
            Early to rise 😇
            -----------------
            `)
        }
    }
}