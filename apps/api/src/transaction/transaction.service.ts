import { TransactionDTO } from '@fint/shared-types'
import { Injectable } from '@nestjs/common'

const getWeek = function(date) {
  const time = new Date(date.getTime());
  time.setHours(0, 0, 0, 0);
  time.setDate(date.getDate() + 3 - (time.getDay() + 6) % 7);
  const week1 = new Date(time.getFullYear(), 0, 4);
  return 1 + Math.round(((time.getTime() - week1.getTime()) / 86400000
    - 3 + (week1.getDay() + 6) % 7) / 7);
};

const cashInRate = 0.0003;
const cashOutRate = 0.003;
const minCashInCommision = 5;
const naturalCommisionfreeAmount = 1000;


@Injectable()
export class TransactionService {
  message = '0'
  userTransactions = {}

  addNewUser(dto: TransactionDTO, year: number, week: number) {
      this.userTransactions[dto.user_id] = {
        year,
        week,
        amount: dto.operation.amount
      }
      this.message = ((Math.max(dto.operation.amount - naturalCommisionfreeAmount, 0)) * cashOutRate).toFixed(2);
  }

  updateUser(dto: TransactionDTO, year: number, week: number) {
    const userTransactions = this.userTransactions[dto.user_id];
    const {year: lastTransactionYear, week: lastTransactionWeek, amount} = userTransactions;

    if (year === lastTransactionYear && week === lastTransactionWeek) {
      this.userTransactions[dto.user_id] = {...this.userTransactions[dto.user_id], amount: amount + dto.operation.amount};
      const uncommisionMargin = Math.max(naturalCommisionfreeAmount - amount, 0);
      this.message = ((dto.operation.amount - uncommisionMargin) * cashOutRate).toFixed(2);
    } else {
      this.userTransactions[dto.user_id] = {year, week, amount};
      this.message = ((dto.operation.amount - naturalCommisionfreeAmount) * cashOutRate).toFixed(2);
    }

  }

  addTransaction(dto: TransactionDTO) {
    if (dto.type === 'cash_in') {
      return {message:  Math.min((dto.operation.amount * cashInRate), minCashInCommision).toFixed(2)}
    }

    if (dto.user_type === 'juridical') {
      return {message:  Math.max(dto.operation.amount * cashOutRate, 0.5).toFixed(2)}
     }
     const date = new Date(dto.date)
     const year = date.getFullYear();
     const week = getWeek(date);

    if (this.userTransactions[dto.user_id]) {
      this.updateUser(dto, year, week);
    } else {
      this.addNewUser(dto, year, week);
    }

    return { message: this.message }
  }
}
