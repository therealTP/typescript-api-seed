import { Request, Response } from 'express';

export let list = (req: Request, res: Response) => {
    res.json({"message": "Success!"});
}