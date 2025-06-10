import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/create")
  async create(
    @Body() createUserDto: { email: string; password: string; name: string }
  ) {
    return this.userService.create(createUserDto);
  }

  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  async findOne(@Param("id") id: string) {
    return this.userService.findById(Number(id));
  }
}
