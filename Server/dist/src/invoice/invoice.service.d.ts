import { PrismaService } from "../prisma/prisma.service";
export declare class InvoiceService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllInvoices(): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        vendor_name: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        due_date: Date;
        description: string;
        user_id: string;
        paid: boolean;
    }[]>;
    findInvoiceById(id: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        vendor_name: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        due_date: Date;
        description: string;
        user_id: string;
        paid: boolean;
    }>;
}
