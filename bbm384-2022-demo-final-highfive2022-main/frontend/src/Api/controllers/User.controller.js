import { USERS } from "../models/User.model";

export default class UserController {
    getUserByEmail(email) {
        if (!email) throw new Error("Email cannot be null");
        return USERS.find((user) => user.email === email);
    }
}
