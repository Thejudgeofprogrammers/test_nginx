import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { CreateUserDTO } from '../user/dto';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {};

    @Post('register')
    async register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
        try {
            return await this.authService.registerUser(dto);
        } catch (err) {
            throw err;
        };
    };

    @Post('login')
    async login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
        try {
            return await this.authService.loginUser(dto);
        } catch (err) {
            throw err;
        };
    };
};
