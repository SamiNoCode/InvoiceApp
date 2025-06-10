"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = await prisma.user.create({
        data: {
            email: "john.doe@example.com",
            password: hashedPassword,
            name: "John Doe",
        },
    });
    const invoices = await Promise.all([
        prisma.invoice.create({
            data: {
                vendor_name: "Office Supplies Co.",
                amount: 299.99,
                due_date: new Date("2024-05-15"),
                description: "Monthly office supplies",
                user_id: user.id.toString(),
                paid: false,
            },
        }),
        prisma.invoice.create({
            data: {
                vendor_name: "Tech Solutions Inc.",
                amount: 1499.99,
                due_date: new Date("2024-05-20"),
                description: "IT Equipment and Services",
                user_id: user.id.toString(),
                paid: true,
            },
        }),
        prisma.invoice.create({
            data: {
                vendor_name: "Marketing Agency XYZ",
                amount: 750.0,
                due_date: new Date("2024-05-30"),
                description: "Digital Marketing Campaign",
                user_id: user.id.toString(),
                paid: false,
            },
        }),
    ]);
    console.log("Seed data created successfully:", {
        user: { id: user.id, email: user.email },
        invoicesCount: invoices.length,
    });
}
main()
    .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
    [];
});
//# sourceMappingURL=seed.js.map