import { Module } from '@nestjs/common';
import { DispatcherController } from './dispatchers/dispatcher.controller';
import { DispatcherModule } from './dispatchers/dispatcher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispatch } from './dispatchers/entity/dispatcher.entity';

@Module({
  imports: [DispatcherModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOSTNAME || 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'cosmos',
      entities: [Dispatch],
      synchronize: true, //only on dev
    }),
  ],
})
export class AppModule {}
