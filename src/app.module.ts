/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { CartProductModule } from './cart-product/cart-product.module';
import { PaymentStatusModule } from './payment-status/payment-status.module';
import { PaymentModule } from './payment/payment.module';
import { OrderProductModule } from './order-product/order-product.module';
import { OrderModule } from './order/order.module';
import { CarreiosModule } from './carreios/carreios.module';
@Module({
  imports: [
    ConfigModule.forRoot({
       envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true,
    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
    CacheModule,
    AuthModule,
    JwtModule,
    ProductModule,
    CategoryModule,
    CartModule,
    CartProductModule,
    PaymentStatusModule,
    PaymentModule,
    OrderProductModule,
    OrderModule,
    CarreiosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
