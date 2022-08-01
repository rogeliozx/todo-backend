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
} from '@nestjs/common';
import { TodoAppService } from './todo-app.service';

@Controller('todo-app')
export class TodoAppController {
  constructor(private productService: TodoAppService) {}

  // Add Product: /product/create
  @Post('/create')
  async createProduct(@Res() res, @Body() createProductDTO: any) {
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Product Successfully Created',
      product,
    });
  }

  @Get('/todo-items')
  async getProducts(@Res() res, @Query('userID') userID) {
    const products = await this.productService.getProducts(userID);
    return res.status(HttpStatus.OK).json(products);
  }

  // Delete Product: /delete?productID=5c9d45e705ea4843c8d0e8f7
  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('todoID') todoID) {
    const productDeleted = await this.productService.deleteProduct(todoID);
    if (!productDeleted) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted Successfully',
      productDeleted,
    });
  }

  // Update Product: /update?productID=5c9d45e705ea4843c8d0e8f7
  @Put('/update')
  async updateProduct(
    @Res() res,
    @Body() updateTodo: any,
    @Query('todoID') todoID,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      todoID,
      updateTodo,
    );
    if (!updatedProduct) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Updated Successfully',
      updatedProduct,
    });
  }
}
