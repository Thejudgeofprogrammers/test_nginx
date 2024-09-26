import { BadRequestException, Injectable } from '@nestjs/common';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { CreateUserDTO } from '../user/dto';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) {};

    async registerUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
        try {
            console.log('Received registration data:', dto);
            const existUser = await this.userService.findUserByEmail(dto.email);
            console.log('Existing user check:', existUser);
            if (existUser) throw new BadRequestException('Error user exist!');
            return this.userService.createUser(dto);        
        } catch (err) {
            console.error('Registration error:', err);
            throw err;
        }
    }

    async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
        try {
            const existUser = await this.userService.findUserByEmail(dto.email);
            if (!existUser) throw new BadRequestException('Error dont find user!');
            const validatePassword = await bcrypt.compare(dto.password, existUser.password);
            if (!validatePassword) throw new BadRequestException('BadRequest user data!')
            const user = await this.userService.publicUser(dto.email);
            const token = await this.tokenService.generateJwtToken(user);
            return { user, token };
        } catch (err) {
            throw new Error(err);  
        };
    };
};
