import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.modules';
import { 
  ConfigModule, 
  ConfigService 
} from '@nestjs/config';
import { getDBConfig } from './configs/database.config';
import { User, userSchema } from './schemas/User.schema';
import { MongooseConnectionService } from './providers/mongoose-connection.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...getDBConfig(configService),
      }),
    }),
    MongooseModule.forFeature([
      { name: "User", schema: userSchema },
    ]),
    UserModule
  ],
  controllers: [],
  providers: [
    MongooseConnectionService,
  ],
})
export class AppModule {}
