import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.modules';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dulanjayasandaruwan1998:TLJq1jWpiSEadXT0@nestjs-crud.5pxe3z9.mongodb.net/'),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
