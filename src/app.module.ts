import { Module } from '@nestjs/common';
import { EconomyModule } from './economy/economy.module';

@Module({
  imports: [
    EconomyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
