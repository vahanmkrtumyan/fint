type UserType = {
  value: string
  label: string
}

type TransactionType = {
  value: string
  label: string
}

export type FormData = {
  user_id: number
  amount: number
  user_type: UserType
  type: TransactionType
}

export type TransactionDTO = {
  date: string;
  user_id: number;
  user_type: string;
  type: string;
  operation: {
    amount: number;
    currency: "EUR"
  }
}
