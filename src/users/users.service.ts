import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../interface/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // Get a single Product
  async getProduct({ password, email }: any): Promise<string> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) throw new BadRequestException();
    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException();
    const token = this.jwtService.sign({
      mail: user.email,
      _id: user._id,
    });
    return token;
  }

  // Post a single product
  async createProduct(createProductDTO: any): Promise<User> {
    const salt = await bcrypt.genSalt();
    createProductDTO.password = await bcrypt.hash(
      createProductDTO.password,
      salt,
    );
    const newProduct = new this.userModel(createProductDTO);
    newProduct.save();
    return newProduct;
  }

  // Delete Product
  async deleteProduct(productID: any): Promise<any> {
    const deletedProduct = await this.userModel.findOneAndDelete(productID);
    return deletedProduct;
  }

  // Put a single product
  async updateProduct(productID: string, createProductDTO: any): Promise<User> {
    const updatedProduct = await this.userModel.findByIdAndUpdate(
      productID,
      createProductDTO,
      { new: true },
    );
    return updatedProduct;
  }
}
