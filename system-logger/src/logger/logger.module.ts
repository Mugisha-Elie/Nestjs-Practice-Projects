import { Module } from '@nestjs/common';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';
import { ConsoleLogger, FileLogger } from './logger-strategies';

const appConfig = {
  appName: 'System Activity Monitor',
  environment: 'development',
  maxLogLevel: 'debug',
};

@Module({
  controllers: [LoggerController],
  providers: [
    LoggerService,
    ConsoleLogger,
    FileLogger,
    {
      provide: 'APP_CONFIG',
      useValue: appConfig,
    },
    {
      provide: 'LOGGER_STRATEGY',
      useClass: FileLogger,
    },
  ],
})
export class LoggerModule {}
