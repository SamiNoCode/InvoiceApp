import { Test, TestingModule } from "@nestjs/testing";
import { InvoiceService } from "../invoice.service";
import { PrismaService } from "../../prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";

describe("InvoiceService", () => {
  let service: InvoiceService;
  let prisma: PrismaService;

  const mockPrismaService = {
    invoice: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<InvoiceService>(InvoiceService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all invoices", async () => {
      const expectedInvoices = [
        {
          id: "1",
          vendor_name: "Test Vendor",
          amount: 100,
          due_date: new Date(),
          description: "Test Invoice",
          user_id: "1",
          paid: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      mockPrismaService.invoice.findMany.mockResolvedValue(expectedInvoices);

      const result = await service.findAllInvoices();
      expect(result).toEqual(expectedInvoices);
      expect(prisma.invoice.findMany).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a single invoice by id", async () => {
      const expectedInvoice = {
        id: "1",
        vendor_name: "Test Vendor",
        amount: 100,
        due_date: new Date(),
        description: "Test Invoice",
        user_id: "1",
        paid: false,
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockPrismaService.invoice.findUnique.mockResolvedValue(expectedInvoice);

      const result = await service.findInvoiceById("1");
      expect(result).toEqual(expectedInvoice);
      expect(prisma.invoice.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
    });

    it("should throw NotFoundException for non-existent invoice", async () => {
      mockPrismaService.invoice.findUnique.mockResolvedValue(null);

      await expect(service.findInvoiceById("2")).rejects.toThrow(
        new NotFoundException("Invoice with ID 2 not found")
      );
    });
  });
});
