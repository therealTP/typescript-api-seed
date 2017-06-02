import { Router } from 'express';

export class AppRouter {
    router: Router;

    constructor() {
        this.router = Router();
    }
}