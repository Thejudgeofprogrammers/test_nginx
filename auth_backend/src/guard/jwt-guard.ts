import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const req: Request = context.switchToHttp().getRequest();
        const token = req.cookies['authToken'];
    
        if (!token) return false;
    
        try {
            const decoded = this.jwtService.verify(token);
            req.user = decoded;
            return true;
        } catch (err) {
            return false;
        };
    };
};