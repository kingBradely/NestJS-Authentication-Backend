import { DataSourceOptions } from 'typeorm';
import { User } from "src/users/entities/user.entity";
import { createConnection } from 'mysql2/promise';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    entities: [User],
    synchronize: false, // Enable synchronize for development
});

export const createDatabase = async (configService: ConfigService) => {
    const connection = await createConnection({
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        user: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${configService.get<string>('DATABASE_NAME')}`);
    await connection.end();
};
