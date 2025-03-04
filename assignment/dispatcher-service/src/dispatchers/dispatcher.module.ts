import { Module } from '@nestjs/common';
import { DispatcherService } from './dispatcher.service'
import { DispatcherController } from './dispatcher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispatch } from './entity/dispatcher.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Dispatch]), HttpModule],
  controllers: [DispatcherController],
  providers: [DispatcherService]
})
export class DispatcherModule {}
