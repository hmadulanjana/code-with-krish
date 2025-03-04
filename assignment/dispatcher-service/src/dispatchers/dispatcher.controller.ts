import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Dispatch } from './entity/dispatcher.entity';
import { DispatcherDto } from './dto/create-dispatcher.dto';
import { DispatcherService } from './dispatcher.service';

@Controller('dispatchers')
export class DispatcherController {
  constructor(private readonly dispatcherService: DispatcherService) {}

  @Get('/dispatch-locations/:city')
  async getVehicleByCity(@Param('city') city: string): Promise<Dispatch[]> {
    return this.dispatcherService.getVehicleByCity(city);
  }

@Post('/dispatch-locations')
async createCustomer(
  @Body() dispathDto: DispatcherDto,
): Promise<Dispatch> {
  return this.dispatcherService.createdispatch(dispathDto);
}
}
