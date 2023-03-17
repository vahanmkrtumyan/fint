import { FormData } from '@fint/shared-types'
import instance from '../../axios'

export const addTransaction = (data: FormData) => {
  return instance.post('transaction', data)
}

export const addTransactions = (formData) => {
  return instance.post('transaction/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
