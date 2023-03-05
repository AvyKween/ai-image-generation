import { Request, Response } from 'express';

export const getPosts = async(req: Request, res: Response) => {

    res.status(200).json({
        ok: true,
    })
}