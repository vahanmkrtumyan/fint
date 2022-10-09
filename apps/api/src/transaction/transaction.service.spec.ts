import { Test } from '@nestjs/testing'
import { TransactionService } from './transaction.service'

describe('TransactionService', () => {
  let service: TransactionService

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [TransactionService],
    }).compile()

    service = app.get<TransactionService>(TransactionService)
  })

  describe('addTransaction', () => {
    it('"', () => {
      expect(
        service.addTransaction({
          date: '2022-08-05',
          user_id: 56,
          user_type: 'natural',
          type: 'cash_in',
          operation: {currency: "EUR", amount: 6546},
        }),
      ).toEqual({ message: '1.96' })
    })
  })
})
