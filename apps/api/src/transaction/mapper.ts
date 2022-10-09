import { FormData, TransactionDTO } from '@fint/shared-types'

export const TransactionMapper = (data: FormData): TransactionDTO => {
  const { user_id, user_type, type, amount } = data

  const date = new Date()
  const formatedDate = date.toISOString().split('T')[0]

  return {
    date: formatedDate,
    user_id,
    user_type: user_type.value,
    type: type.value,
    operation: {
      amount,
      currency: 'EUR',
    },
  }
}
