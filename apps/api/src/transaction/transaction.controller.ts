import { FormData } from '@fint/shared-types'
import { Controller, Post, Body } from '@nestjs/common'
import { TransactionMapper } from './mapper'

import { TransactionService } from './transaction.service'

@Controller('/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  addTransaction(@Body() data: FormData) {
    return this.transactionService.addTransaction(TransactionMapper(data))
  }
}
