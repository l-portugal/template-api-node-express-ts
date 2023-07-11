import { Router } from "express";

import AuthRoutes from "../Controllers/Auth/AuthRoutes";
import ExampleRoutes from "../Controllers/Example/ExampleRoutes";

export default class appRoutesV1 {
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    private routes(): void {
        /**
         * ROUTE api/v1
         */

        this.router.use('/', new ExampleRoutes().router);
        this.router.use('/auth', new AuthRoutes().router);
    }
}