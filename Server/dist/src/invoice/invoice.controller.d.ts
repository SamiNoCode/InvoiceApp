import { InvoiceService } from "./invoice.service";
export declare class InvoiceController {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    findAll(): Promise<{
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
    findOne(id: string): Promise<{
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
