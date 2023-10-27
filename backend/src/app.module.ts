import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { PagesModule } from './pages/pages.module';
import { CategoriesModule } from './categories/categories.module';
import { SiteConfigsModule } from './siteconfigs/siteconfigs.module';
import { ImagesModule } from './images/images.module';
import { CartsModule } from './carts/carts.module';

@Module({ 
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    UsersModule,
    AuthModule,
    PagesModule,
    CategoriesModule,
    ProductsModule,
    SiteConfigsModule,
    ImagesModule,
    CartsModule,
  ],
})
export class AppModule { }
