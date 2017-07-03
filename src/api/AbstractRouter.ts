import { Router } from 'express';
import { Controller } from './AbstractController';

export abstract class AbstractRouter<ControllerType> {
    public router: Router;
    protected controller: ControllerType;

    constructor(controller: ControllerType implements Controller) {
        this.router = Router();
        this.controller = controller;
    }

    // abstract setRoutes(): void;

    setRoutes(): void {
        this.router.get('/', this.controller.list);
        this.router.post('/', this.controller.create);
        this.router.get('/:id', this.controller.read);
        this.router.put('/:id', this.controller.update);
        this.router.delete('/:id', this.controller.delete);
    }
}