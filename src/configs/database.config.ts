import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getDBConfig = (configService: ConfigService): MongooseModuleOptions => ({
    uri: configService.get<string>('DevDB_URL'),
});
