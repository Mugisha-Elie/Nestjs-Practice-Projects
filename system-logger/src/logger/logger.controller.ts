import { Controller, Get, Post, Body} from '@nestjs/common';
import { LoggerService } from './logger.service';

@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) { }

  @Get('config')
  getConfig() {
    return this.loggerService.getAppDetails();
  }

  @Post('log')
  createLog(@Body('action') action: string) {
    return {status: 'success', result: this.loggerService.logActivity(action)}
  }
}
