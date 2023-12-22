import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import * as jwt from 'jsonwebtoken';
import { OrdersService } from 'src/product_items/services/products.service';
import { OrdersServiceProduct } from 'src/products/services/products.service';


@Controller('statistics')
@ApiTags('statistics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('authorization')

export class StatisticsController {
  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly ordersService: OrdersService,
    private readonly productsService: OrdersServiceProduct,
  ) {}

  @Get()
  async getStatistics(@Req() request: any): Promise<any> {
    const token = request.headers.authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const warehouseId = decodedToken["warehouse_id"];
    if (warehouseId) {
      const productItems: any[] = await this.ordersService.findProductItemsByWarehouseId(warehouseId);
      const productsArray: any[] = [];
      
      for (const productId of productItems) {
        // const quantity = productId.get('quantity') || 0;
        // const quantity_sold = productId.get('quantity_sold') || 0;
        // const remainingQuantity = quantity - quantity_sold;

        const product_id = productId.get('product_id')

        if (product_id) {
          const product = await this.productsService.findRoleById(product_id);
          if (product) {
            const productWithDetails = { ...product.toObject(), ...productId.toObject()};
            // const productWithDetails = { ...product.toObject(), ...productId.toObject(), "remainingQuantity": remainingQuantity };
            productsArray.push(productWithDetails);
          }
        }
      }
      return productsArray;
    }
  }
}