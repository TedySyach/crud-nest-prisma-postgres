import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseFormatter } from 'src/helper/response-formater';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const data = await this.productService.create(createProductDto);

    return ResponseFormatter.success(201, data, 'Berhasil Membuat Product');
  }

  @Get()
  async findAll() {
    const data = await this.productService.findAll();

    return ResponseFormatter.success(
      200,
      data,
      'Berhasil Mengambil Data Product',
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.productService.findOne(+id);

    if (!data) {
      return ResponseFormatter.error(data, 'Product Tidak Ada');
    }

    return ResponseFormatter.success(
      200,
      data,
      'Berhasil Mengambil Data Detail Product',
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
