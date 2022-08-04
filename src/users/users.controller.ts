import {
  Controller,
  Post,
  Res,
  HttpStatus,
  Body,
  Get,
  NotFoundException,
  Delete,
  Query,
  Put,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private productService: UsersService) {}

  // Add Product: /product/create
  @Post('/sigin')
  async createProduct(@Res() res, @Body() createProductDTO: any) {
    try {
      const accessToken = await this.productService.createProduct(createProductDTO);

      return res.status(HttpStatus.OK).json({
        message: 'Product Successfully Created',
        accessToken,
      });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Product Successfully Created',
        error,
      });
    }
 
  }

  @Post('/login')
  async getProduct(@Res() res, @Body() createProductDTO: any) {
    const token = await this.productService.getProduct(createProductDTO);
    if (!token) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({ accessToken: token });
  }
}
