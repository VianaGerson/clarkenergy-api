import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EconomyModule } from './economy/economy.module';

@Module({
  imports: [
    EconomyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
