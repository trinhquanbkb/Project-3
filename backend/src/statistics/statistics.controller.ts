import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import * as jwt from 'jsonwebtoken';
import { OrdersService} from 'src/product_items/services/products.service';
import { OrdersService as OrdersServiceProduct } from 'src/products/services/products.service';
import axios from 'axios';
import { parse } from 'url';


@Controller('statistics')
@ApiTags('statistics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('authorization')

export class StatisticsController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Get()
  async getStatistics(@Req() request: any) {
    const apiUrl = request.protocol + '://' + request.get('host') + '/products/';
    const token = request.headers.authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const warehouseId = decodedToken["warehouse_id"]._id;
    
    if (warehouseId) {
      const productItems: any = await this.ordersService.findProductItemsByWarehouseId(warehouseId);
      const uniqueData = Array.from(new Set(productItems.map(item => item.product_id))).map(productId => {
        return productItems.find(item => item.product_id === productId);
      });
      const productsArray: any[] = [];
      const itemsInWarehouse: any[]= [];
      for (const productId of uniqueData) {
        const product_id = productId.get('product_id')
        const response = await axios.get(apiUrl + product_id, {
          headers: {
            Authorization: request.headers.authorization
          }
        });
        const data = response.data;

        productsArray.push(data);
        
      }

      
      for (const product of productsArray) {
        const filteredProductItems = product.product_items.filter(
          (item) => item.warehouse_id === warehouseId
        );
        product.product_items = filteredProductItems;
      }


      productsArray.forEach((product) => {
        const totalSold = product.product_items.reduce((acc, item) => acc + item.quantity_sold, 0);
        const inventory = product.quantity - totalSold;
        product.total_sold = totalSold;
        product.inventory = inventory;
      });

      return productsArray;
    }
  }
}