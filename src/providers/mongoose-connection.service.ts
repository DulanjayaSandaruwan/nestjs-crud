import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class MongooseConnectionService implements OnModuleInit {
  private readonly logger = new Logger(MongooseConnectionService.name);

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.logger.log('MongooseConnectionService instantiated');
  }

  async onModuleInit() {
    // Check connection state after module initialization
    this.logCurrentConnectionState();
  }

  private logCurrentConnectionState() {
    if (this.connection.readyState === 1) {
      this.logger.log('MongoDB connected successfully');
    } else {
      this.logger.warn(`MongoDB connection state: ${this.connection.readyState}`);
    }
  }
}
