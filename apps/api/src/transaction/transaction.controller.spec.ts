import { Test, TestingModule } from '@nestjs/testing';

import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

describe('TransactionController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [TransactionService],
    }).compile();
  });

  describe('addTransaction', () => {
    it('should return correct commision', () => {
      const transactionController = app.get<TransactionController>(
        TransactionController
      );
      expect(transactionController.addTransaction({
        user_id: 56,
        user_type: {label: 'Natural', value: 'natural'},
        type: {label: 'Cash in', value:'cash_in'},
        amount: 6546,
      }
      )).toEqual({
        message: '1.96',
      });
    });
  });
});
