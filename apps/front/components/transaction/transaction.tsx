import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast';
import { FormData } from '@fint/shared-types'
import { Button, Input, Select } from '../'
import { Container, SelectWrapper } from './transaction.style'
import { addTransaction } from '../api/transactions'

const userTypeOptions = [
  { value: 'natural', label: 'Natural' },
  { value: 'juridical', label: 'Juridical' },
]

const transactionTypeOptions = [
  { value: 'cash_in', label: 'Cash in' },
  { value: 'cash_out', label: 'Cash out' },
]

const formSchema = Yup.object().shape({
  user_id: Yup.number().typeError('Field is Required.').min(1, 'Please enter a number greater than 0'),
  amount: Yup.number().typeError('Field is Required.').min(1, 'Please enter a number greater than 0'),
})

const defaultValues = {
  user_type: userTypeOptions[0],
  type: transactionTypeOptions[0],
  user_id: 0,
  amount: 0,
}

const Transaction = () => {
  const mutation = useMutation(addTransaction, {
    onSuccess: (response) => {
      toast(`The commision is ${response.data.message}`)
    },
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: FormData) => {
    await mutation.mutate(data)
    reset(defaultValues);
  }

  return (
    <>
      <Container>
        <Controller
          name="user_id"
          render={({ field }) => (
            <Input
              {...field}
              label="User id"
              size="sm"
              pattern="^[0-9]*$"
              value={field.value || ''}
              errorMessage={errors.user_id?.message}
              withMargin
            />
          )}
          control={control}
        />
        <Controller
          name="amount"
          render={({ field }) => (
            <Input
              {...field}
              label="Amount EUR"
              size="sm"
              pattern="^[0-9]*$"
              value={field.value || ''}
              errorMessage={errors.amount?.message}
              withMargin
            />
          )}
          control={control}
        />
        <SelectWrapper>
          <Controller
            name="user_type"
            render={({ field }) => (
              <Select {...field} options={userTypeOptions} value={field.value} data-testid="user_type" />
            )}
            control={control}
          />
        </SelectWrapper>
        <SelectWrapper>
          <Controller
            name="type"
            render={({ field }) => (
              <Select {...field} options={transactionTypeOptions} value={field.value} data-testid="type" />
            )}
            control={control}
          />
        </SelectWrapper>
        <Button onClick={handleSubmit(onSubmit)} size="sm">
          Submit
        </Button>
      </Container>
      <Toaster
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          }
        }}
      />
    </>
  )
}

export default Transaction
