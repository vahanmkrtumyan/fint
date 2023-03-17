import { TransactionDTO } from '@fint/shared-types'
import { Injectable } from '@nestjs/common'

const getWeek = function (date) {
  const time = new Date(date.getTime())
  time.setHours(0, 0, 0, 0)
  time.setDate(date.getDate() + 3 - ((time.getDay() + 6) % 7))
  const week1 = new Date(time.getFullYear(), 0, 4)
  return 1 + Math.round(((time.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
}

// const cashOutRate = 0.003
// const naturalCommisionfreeAmount = 1000

type UserTransactions = { [key: string]: { [key: string]: number } }
type CashInConfig = {
  percents: number
  max: {
    amount: number
    currency: 'EUR'
  }
}

type CashOutNaturalConfig = {
  percents: number
  week_limit: {
    amount: number
    currency: 'EUR'
  }
}

type CashOutJuridicalConfig = {
  percents: number
  min: {
    amount: number
    currency: 'EUR'
  }
}

@Injectable()
export class TransactionService {
  message = '0'
  userTransactions: UserTransactions = {}

  async addTransaction({
    input,
    cashInConfig,
    cashOutNaturalConfig,
    cashOutJuridicalConfig,
  }: {
    input: TransactionDTO
    cashInConfig: CashInConfig
    cashOutNaturalConfig: CashOutNaturalConfig
    cashOutJuridicalConfig: CashOutJuridicalConfig
  }) {
    if (input.type === 'cash_in') {
      return Math.min(input.operation.amount * cashInConfig.percents * 0.01, cashInConfig.max.amount).toFixed(2)
    }

    if (input.user_type === 'juridical') {
      return Math.max(input.operation.amount * cashOutJuridicalConfig.percents * 0.01, 0.5).toFixed(2)
    }
    const date = new Date(input.date)
    const year = date.getFullYear()
    const week = getWeek(date)

    const { user_id } = input
    const { amount } = input.operation

    const weekTransactionAmount = this.userTransactions[user_id]?.[`${year}_${week}`] || 0
    const remainingCommisionfreeAmount = Math.max(cashOutNaturalConfig.week_limit.amount - weekTransactionAmount, 0)
    const commisionableAmount = amount > remainingCommisionfreeAmount ? amount - remainingCommisionfreeAmount : 0

    this.message = (commisionableAmount * cashOutNaturalConfig.percents * 0.01).toFixed(2)
    if (this.userTransactions[user_id]) {
      this.userTransactions[user_id][`${year}_${week}`] = weekTransactionAmount + amount
    } else {
      this.userTransactions[user_id] = {
        [`${year}_${week}`]: amount,
      }
    }

    return this.message
  }
}
