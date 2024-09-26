import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { CreateUserDTO } from '../user/dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {};

    @Get('check')
    @UseGuards(AuthGuard('jwt'))
    checkAuth(@Req() req: any, @Res() res: any) {
      res.send({ isAuthenticated: true });
    };

    @Post('register')
    async register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
        try {
            return await this.authService.registerUser(dto);
        } catch (err) {
            throw err;
        };
    };

    @Post('login')
    async login(@Body() dto: UserLoginDTO, @Res() res: any): Promise<AuthUserResponse> {
        try {
            const authResponse = await this.authService.loginUser(dto);
            res.cookie('authToken', authResponse.token, {
                httpOnly: false,
                maxAge: 7 * 24 * 60 * 60 * 1000, // 1 неделя
                sameSite: 'strict',
                //secure: process.env.NODE_ENV === 'production',  // Используйте secure только в HTTPS
                path: '/'
            });
            
            res.cookie('userEmail', dto.email, {
                httpOnly: false,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: 'strict',
                //secure: process.env.NODE_ENV === 'production',
                path: '/'
            });            
          
            return res.status(200).json(authResponse);
        } catch (err) {
            throw err;
        };
    };

    @Post('logout')
    logout(@Res() res: any, @Req() req: any) {
        console.log('Cookies before logout:', req.cookies);
        res.clearCookie('authToken');
        return res.status(200).send('Успешно вышли');
    };
};
