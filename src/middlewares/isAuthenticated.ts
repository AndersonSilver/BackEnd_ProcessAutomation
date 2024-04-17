import { NextFunction, Request, Response } from "express";

import fs from 'fs';
import path from 'path';

export function isAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authToken = request.headers.authorization;
    
    if (!authToken) {
        return response.status(401).json({
        statuscode: 401,
        message: "Unauthorized",
        });
    }

    try {

        const acessToken = authToken.slice(7);
        const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, '../authToken', 'tokens.json'), 'utf-8'));

        if (![tokens.tokens.Authorization, tokens.tokens.AuthorizationRA, tokens.tokens.AuthorizationRCB].includes(acessToken)) {
            return response.status(401).json({
                statuscode: 401,
                message: "Unauthorized",
            });
        }

        return next();
    } catch (error) {
        return response.status(500).json({
            statuscode: 500,
            message: "Error in server. Please try again later.",
        });
    }
}