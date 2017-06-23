import { Router } from 'express';

export class AppRouter {
    public router: Router;

    constructor() {
        this.router = Router();
    }
}