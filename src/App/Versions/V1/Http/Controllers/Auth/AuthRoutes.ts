import { Router } from "express";
import { AuthValidator } from "./AuthValidators";
import { AuthController } from "./AuthController";

export default class AuthRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes()
    }

    private routes(): void {
        /**
         * POST api/v1/auth/login
         */
        this.router.post('/login', AuthValidator.login, AuthController.login);
    }
}