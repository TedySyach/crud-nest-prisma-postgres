import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductCategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    const data = await this.prisma.productCategories.create({
      data: {
        name: createProductCategoryDto.name,
      },
    });

    return data;
  }

  async findAll() {
    const data = await this.prisma.productCategories.findMany();

    return data;
  }

  async findOne(id: number) {
    const data = await this.prisma.productCategories.findUnique({
      where: {
        id: id,
      },
      include: {
        product: true,
      },
    });

    return data;
  }

  async update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    const data = await this.prisma.productCategories.update({
      data: {
        name: updateProductCategoryDto.name,
      },
      where: {
        id: id,
      },
    });

    return data;
  }

  async remove(id: number) {
    await this.prisma.productCategories.delete({
      where: {
        id: id,
      },
    });

    return true;
  }
}
