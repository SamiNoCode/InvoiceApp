import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: {
        email: string;
        password: string;
        name: string;
    }): Promise<{
        id: number;
        email: string;
        password: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>;
    findOne(id: string): Promise<{
        id: number;
        email: string;
        password: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>;
}
