import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import * as jwt from 'jsonwebtoken';
import { OrdersService } from 'src/product_items/services/products.service';
import { OrdersService as OrdersServiceProduct } from 'src/products/services/products.service';
import axios from 'axios';

@Controller('top-product')
@ApiTags('top-product')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('authorization')
export class TopProductController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly productsService: OrdersServiceProduct,
  ) {}

  @Get('/top-product/:top')
  async getStatistics(@Req() request: any, @Param('top') top: number) {
    const apiUrl =
      request.protocol + '://' + request.get('host') + '/products/';
    const token = request.headers.authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const warehouseId = decodedToken['warehouse_id']._id;

    if (warehouseId) {
      const productItems: any =
        await this.ordersService.findProductItemsByWarehouseId(warehouseId);
      const uniqueData = Array.from(
        new Set(productItems.map((item) => item.product_id)),
      ).map((productId) => {
        return productItems.find((item) => item.product_id === productId);
      });

      const productsArray: any[] = [];
      for (const productId of uniqueData) {
        const product_id = productId.get('product_id');
        const response = await axios.get(apiUrl + product_id, {
          headers: {
            Authorization: request.headers.authorization,
          },
        });
        const data = response.data;
        productsArray.push(data);
      }
      for (const product of productsArray) {
        const filteredProductItems = product.product_items.filter(
          (item) => item.warehouse_id === warehouseId,
        );
        product.product_items = filteredProductItems;
      }

      const sortedProducts = productsArray.sort(
        (a, b) => b.inventory - a.inventory,
      );
      const topProducts = sortedProducts.slice(0, top);

      topProducts.forEach((product) => {
        const totalSold = product.product_items.reduce(
          (acc, item) => acc + item.quantity_sold,
          0,
        );
        const inventory = product.quantity - totalSold;
        product.total_sold = totalSold;
        product.inventory = inventory;
      });

      return topProducts.sort((a, b) => b.quantity - a.quantity);
    }
  }

  @Get('/top-inventory/:topInventory')
  async getTopInventoryProducts(
    @Req() request: any,
    @Param('topInventory') top: number,
  ) {
    const apiUrl =
      request.protocol + '://' + request.get('host') + '/products/';
    const token = request.headers.authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const warehouseId = decodedToken['warehouse_id']._id;

    if (warehouseId) {
      const productItems: any =
        await this.ordersService.findProductItemsByWarehouseId(warehouseId);
      const uniqueData = Array.from(
        new Set(productItems.map((item) => item.product_id)),
      ).map((productId) => {
        return productItems.find((item) => item.product_id === productId);
      });

      const productsArray: any[] = [];
      for (const productId of uniqueData) {
        const product_id = productId.get('product_id');
        const response = await axios.get(apiUrl + product_id, {
          headers: {
            Authorization: request.headers.authorization,
          },
        });
        const data = response.data;
        productsArray.push(data);
      }
      for (const product of productsArray) {
        const filteredProductItems = product.product_items.filter(
          (item) => item.warehouse_id === warehouseId,
        );
        product.product_items = filteredProductItems;
      }

      const sortedProducts = productsArray.sort(
        (a, b) => b.inventory - a.inventory,
      );
      const topProducts = sortedProducts.slice(0, top);
      topProducts.forEach((product) => {
        console.log(product);
        const totalSold = product.quantity_sold;
        const inventory = product.quantity - totalSold;
        product.total_sold = totalSold;
        product.inventory = inventory;
      });

      return topProducts.sort((a, b) => b.total_sold - a.total_sold);
    }
  }
}
