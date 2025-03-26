import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
        @ApiProperty({ required: false, description: 'User ID' })
        id?: number;

        @ApiProperty({ description: 'User name', example: 'John Doe' })
        name: string;

        @ApiProperty({ description: 'User email', example: 'john@example.com' })
        email: string;

        @ApiProperty({ required: false, description: 'User password' })
        password?: string;

        @ApiProperty({ required: false, description: 'User role', example: 'user' })
        role?: string;

        @ApiProperty({ required: false, description: 'Creation timestamp' })
        createdAt?: Date;    

        @ApiProperty({ required: false, description: 'Last update timestamp' })
        updatedAt?: Date;
}
