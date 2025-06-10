import { PrismaService } from "../prisma/prisma.service";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
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
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        password: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>;
    findById(id: number): Promise<{
        id: number;
        email: string;
        password: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>;
}
