import { FormData } from '@fint/shared-types'
import instance from '../../axios'

export const addTransaction = (data: FormData) => {
  return instance.post('transaction', data)
}
