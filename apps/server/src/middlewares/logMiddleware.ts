import { NextFunction, Request, Response } from "express";

export function logErrors(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err.stack)
    next(err)
}