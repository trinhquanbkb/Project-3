import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { RolesModule } from './roles/roles.module';
import { PermisstionsModule } from './permissions/permisstions.module';
import { WarehousesModule } from './warehouse/warehouses.module';
import { FinancialTransactionModule } from './financial_transactions/financial-transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    UsersModule,
    AuthModule,
    ImagesModule,
    RolesModule,
    PermisstionsModule,
    WarehousesModule,
    FinancialTransactionModule,
  ],
})
export class AppModule {}
