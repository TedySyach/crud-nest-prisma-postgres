import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const data = await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
        productCategoriesId: createProductDto.productCategoriesId,
      },
      include: {
        ProductCategories: true,
      },
    });

    delete data.productCategoriesId;

    return data;
  }

  async findAll() {
    const data = await this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        ProductCategories: true,
      },
    });

    return data;
  }

  async findOne(id: number) {
    const data = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        price: true,
        ProductCategories: true,
      },
    });

    return data;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const data = await this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: updateProductDto.name,
        price: updateProductDto.price,
        productCategoriesId: updateProductDto.productCategoriesId,
      },
      include: {
        ProductCategories: true,
      },
    });

    return data;
  }

  async remove(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      return 'product tidak ada';
    }

    await this.prisma.product.delete({
      where: {
        id: id,
      },
    });

    return true;
  }
}
