import { AuthenticateDto } from './dto/authenticate.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IAuthenticate, Role } from './interface/Role';
import { faker } from '@faker-js/faker';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    users = [
       {
        id: faker.datatype.uuid(),
        userName: "Omar",
        password:"password",
        role:Role.Admin
       },
       {
        id: faker.datatype.uuid(),
        userName: "gomo",
        password:"password",
        role:Role.User
       },
    ]

    // check login
    authenticate(authenticateDto:AuthenticateDto): IAuthenticate{
        const user = this.users.find(
            (u) => 
            u.userName === authenticateDto.userName &&
            u.password === authenticateDto.password,
            ) ;
        if (!user) throw new NotFoundException('User not found');

        const token = sign({...user}, 'secret');
        return { token, user };
    }
}
