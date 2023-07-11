import { Router } from "express";
import { validateToken } from "../../../../../../Common/Middleware/validateToken";
import { ExampleController } from "./ExampleController";

export default class ExampleRoutes {
    public router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes(): void {

        /** 
         * GET /api/v1/ 
         */
        this.router.get('/', ExampleController.getHelloWord);

        /** 
         * GET /api/v1/protected
         */ 
        this.router.get('/protected', validateToken, ExampleController.protected);
    }
}