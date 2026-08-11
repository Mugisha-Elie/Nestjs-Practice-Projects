import { Inject, Injectable } from '@nestjs/common';
import { type ILoggerStrategy } from './logger-strategies';

@Injectable()
export class LoggerService {
  constructor(
    @Inject('APP_CONFIG')
    private readonly config: { appName: string, environment: string, maxLogLevel: string },
    @Inject('LOGGER_STRATEGY')
    private readonly loggerStrategy: ILoggerStrategy,
  ) { }

  getAppDetails() {
    return {
      message: `Running ${this.config.appName} in [${this.config.environment}] mode.`,
      logLevel: this.config.maxLogLevel,
    };
  }

  logActivity(action: string) {
    return this.loggerStrategy.log(`User executed action: "${action}"`);
  }
}
