import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("invoices")
@UseGuards(JwtAuthGuard) // Protect all routes in this controller
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  async findAll() {
    return this.invoiceService.findAllInvoices();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.invoiceService.findInvoiceById(id);
  }
}
