import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ProductCategoriesModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
