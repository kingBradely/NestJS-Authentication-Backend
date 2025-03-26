import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    if (!createUserDto.password) {
      throw new Error('Password is required');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const user: CreateUserDto = {
      ...createUserDto,
      password: hashedPassword
    }
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      select: ['id', 'name', 'email','role','createdAt','updatedAt']
    });
  }

  async findByEmail(email: string) {
    return  this.userRepository.findOne({
      where: {
        email : email
      }
    });

  }

  async findOne(id: number) {
    return  this.userRepository.findOne({
      where: {
        id : id
      }
    });

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


  login(email: string, password: string) {
    return this.userRepository.findOne({
      where: {
        email: email
      }
    }).then(user => {
      if (!user) {
        throw new Error('User not found');
      }
      return bcrypt.compare(password, user.password).then(res => {
        if (!res) {
          throw new Error('Invalid credentials');
        }
        return user;
      });
    });
  }
}
