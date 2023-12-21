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
      const productItems = await this.ordersService.findProductItemsByWarehouseId(warehouseId);
      const productItemIds = productItems.map(item => item.id);
      // const productIds = productItems.map(item => item.customProductId);
      const productIds: string[] = [];

      for (const item of productItems) {
        productIds.push(item['product_id']);
        // console.log(item)
      }
      // const productsArray: any[] = [];

      for (const productId of productIds) {
        const product: any = await this.productsService.findRoleById(productId)

        // if (product) {
        //   product.quantity = await this.ordersService.findRoleById(productId)['quantity'];
        //   // product.newField2 = 'value2';
        //   productsArray.push(product);
        // }
        // productsArray.push(product);
        // return product;
        console.log(product)
      }

      // return productsArray;

    }

    
    return "Hết";
  }
}