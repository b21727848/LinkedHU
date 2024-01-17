import UserController from "./User.controller";

export default class AuthController {
    constructor() {
        this.userController = new UserController();
    }

    login(email, password) {
        if (!email || !password)
            throw new Error("Email and password cannot be null");

        const user = this.userController.getUserByEmail(email);
        if (!user) throw new Error("Cannot find user");
        if (password === user.password) return user;
        else throw new Error("Wrong password");
    }
}
