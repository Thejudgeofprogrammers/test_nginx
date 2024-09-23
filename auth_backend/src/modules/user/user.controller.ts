import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Put, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto';
import { JwtAuthGuard } from '../../guard/jwt-guard';

@Controller('api/user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {};

    @Get('by-email')
    async getUserIdByEmail(@Query('email') email: string) {
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        };
        return { userId: user.id };
    };

    @UseGuards(JwtAuthGuard)
    @Get(':email')
    async findUser(@Param('email') email: string) {
        try {
            return await this.userService.findUserByEmail(email);
        } catch (err) {
            throw err;      
        };
    };

    @UseGuards(JwtAuthGuard)
    @Patch()
    async updateUser(@Body() updateDTO: UpdateUserDTO, @Req() req: any): Promise<UpdateUserDTO> {
        try {
            const user = req.user;
            return await this.userService.updateUser(user.email, updateDTO);
        } catch (err) {
            throw err;  
        };
    };

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteUser(@Req() req: any): Promise<boolean> {
        try {
            const user = req.user;
            return await this.userService.deleteUser(user.email);
        } catch (err) {
            throw err;  
        };
    };
};
