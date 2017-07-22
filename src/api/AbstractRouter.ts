import { Router } from 'express';
import { Controller, AbstractController } from './ControllerInterface';

export abstract class AbstractRouter<ControllerType extends Controller> {
    public router: Router;
    protected controller: ControllerType;

    constructor(controller: ControllerType) {
        this.router = Router();
        this.controller = controller;
        this.setRoutes();
    }

    setRoutes(): void {
        this.router.get('/', this.controller.list);
        this.router.post('/', this.controller.create);
        this.router.get('/:id', this.controller.read);
        this.router.put('/:id', this.controller.update);
        this.router.delete('/:id', this.controller.delete);
    }
}