import { Test, TestingModule } from "@nestjs/testing";
import { InvoiceController } from "../invoice.controller";
import { InvoiceService } from "../invoice.service";

describe("InvoiceController", () => {
  let controller: InvoiceController;
  let service: InvoiceService;

  const mockInvoiceService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        {
          provide: InvoiceService,
          useValue: mockInvoiceService,
        },
      ],
    }).compile();

    controller = module.get<InvoiceController>(InvoiceController);
    service = module.get<InvoiceService>(InvoiceService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should return an array of invoices", async () => {
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

      mockInvoiceService.findAll.mockResolvedValue(expectedInvoices);

      const result = await controller.findAll();
      expect(result).toEqual(expectedInvoices);
      expect(service.findAllInvoices).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a single invoice", async () => {
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

      mockInvoiceService.findOne.mockResolvedValue(expectedInvoice);

      const result = await controller.findOne("1");
      expect(result).toEqual(expectedInvoice);
      expect(service.findInvoiceById).toHaveBeenCalledWith("1");
    });
  });
});
