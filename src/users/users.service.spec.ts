import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user with hashed password', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user'
      };

      const hashedPassword = 'hashedPassword';
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt' as never);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);
      mockRepository.save.mockResolvedValue({ ...createUserDto, password: hashedPassword });

      const result = await service.create(createUserDto);

      expect(result).toEqual({ ...createUserDto, password: hashedPassword });
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 'salt');
    });

    it('should throw error if password is not provided', async () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        role: 'user'
      };

      await expect(service.create(createUserDto as CreateUserDto)).rejects.toThrow('Password is required');
    });
  });

  describe('findAll', () => {
    it('should return an array of users without sensitive data', async () => {
      const users = [
        { id: 1, name: 'User1', email: 'user1@example.com', role: 'user', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'User2', email: 'user2@example.com', role: 'admin', createdAt: new Date(), updatedAt: new Date() }
      ];

      mockRepository.find.mockResolvedValue(users);

      const result = await service.findAll();

      expect(result).toEqual(users);
      expect(mockRepository.find).toHaveBeenCalledWith({
        select: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt']
      });
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const user = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        role: 'user'
      };

      mockRepository.findOne.mockResolvedValue(user);

      const result = await service.findByEmail('test@example.com');

      expect(result).toEqual(user);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' }
      });
    });
  });
});
