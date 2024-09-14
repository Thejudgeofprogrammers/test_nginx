import { Body, Controller, Delete, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto';
import { JwtAuthGuard } from 'src/guard/jwt-guard';

@Controller('api/user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {};

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
