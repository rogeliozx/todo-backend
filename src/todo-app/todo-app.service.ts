import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Todo } from '../interface/todo.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TodoAppService {
  constructor(
    @InjectModel('Todo') private readonly productModel: Model<Todo>,
    private jwtService: JwtService,
  ) {}

  // Get all products
  async getProducts(userID: string): Promise<Todo[]> {
    const data = this.jwtService.decode(userID);
    const Id = new mongoose.Types.ObjectId(data['_id']);
    const products = await this.productModel.find({
      owner: Id,
    });
    return products;
  }

  // Post a single product
  async createProduct(createProductDTO: any): Promise<Todo> {
    const data = this.jwtService.decode(createProductDTO.token);
    createProductDTO.owner = data['_id'];
    const newProduct = new this.productModel(createProductDTO);
    return newProduct.save();
  }

  // Delete Product
  async deleteProduct(todoID: string): Promise<any> {
    const deletedProduct = await this.productModel.findOneAndDelete({
      _id: todoID,
    });
    return deletedProduct;
  }

  // Put a single product
  async updateProduct(productID: string, createProductDTO: any): Promise<Todo> {
    console.log(createProductDTO);
    const Id = new mongoose.Types.ObjectId(productID);
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      Id,
      createProductDTO,
      { new: true },
    );
    return updatedProduct;
  }
}
