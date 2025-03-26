import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationDto } from './dto/authentication.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User has been successfully logged in.', schema: {
    properties: {
      access_token: { type: 'string', description: 'JWT access token' },
      user: { type: 'object', description: 'User information' }
    }
  }})
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async login(@Body() authenticationDto: AuthenticationDto) {
    const user = await this.authenticationService.validateUser(authenticationDto.email, authenticationDto.password);
    if (user) {
      return this.authenticationService.login(user);
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

}
