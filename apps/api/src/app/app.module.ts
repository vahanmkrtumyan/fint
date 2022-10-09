import { TransactionModule } from './../transaction/transaction.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [TransactionModule],
})
export class AppModule {}
