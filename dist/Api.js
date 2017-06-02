"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
class Api extends App_1.App {
    constructor() {
        super();
    }
    setRoutes() {
        this.app.use('/source');
    }
}
exports.Api = Api;
