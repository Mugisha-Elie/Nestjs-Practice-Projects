import { Injectable } from "@nestjs/common";

export interface ILoggerStrategy{
  log(message: string): string
}

@Injectable()
export class ConsoleLogger implements ILoggerStrategy{
  log(message: string): string {
    const formatted = `[CONSOLE LOGGER]: ${message}`;
    console.log(formatted);
    return formatted;
  }
}

@Injectable()
export class FileLogger implements ILoggerStrategy{
  log(message: string): string {
    const formatted = `[FILE LOGGER]: Saved "${message}" to /var/logs/app.log`;
    console.log(formatted);
    return formatted;
  }
}