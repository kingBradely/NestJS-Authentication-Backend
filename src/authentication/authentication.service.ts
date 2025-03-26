import { Injectable } from '@nestjs/common';
import { AuthenticationDto } from './dto/authentication.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthenticationService {

  constructor(private readonly userService : UsersService, private readonly jwtService : JwtService) { }

  login(user : User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user : user
    }
  }


  async validateUser(email: string, password: string) {
    const user = await this?.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  
}
