import { FormData } from '@fint/shared-types'
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Bind,
  ParseFilePipe,
  FileTypeValidator,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import * as Yup from 'yup'
import { getCashInConfig, getCashOutNaturalConfig, getCashOutJuridicalConfig } from './configs'
import { TransactionMapper } from './mapper'
import { TransactionService } from './transaction.service'

const schema = Yup.object().shape({
  date: Yup.string().required(),
  user_id: Yup.number().min(1).required(),
  user_type: Yup.mixed().oneOf(['natural', 'juridical']),
  type: Yup.mixed().oneOf(['cash_in', 'cash_out']),
  operation: Yup.object().shape({
    amount: Yup.number().min(1).required(),
    currency: Yup.mixed().oneOf(['EUR']),
  }),
})

@Controller('/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async addTransaction(@Body() data: FormData) {
    // We can add validator for request body
    const [cashInConfig, cashOutNaturalConfig, cashOutJuridicalConfig] = await Promise.all([
      getCashInConfig(),
      getCashOutNaturalConfig(),
      getCashOutJuridicalConfig(),
    ])
    return this.transactionService.addTransaction({
      input: TransactionMapper(data),
      cashInConfig,
      cashOutNaturalConfig,
      cashOutJuridicalConfig,
    })
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @Bind(
    UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'application/json' })],
      }),
    ),
  )
  async uploadFile(file) {
    let { inputs } = JSON.parse(file.buffer)
    if (!inputs) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)

    for (let input of inputs) {
      let isValidInput = await schema.validate(input)
      if (!isValidInput) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
    }

    const [cashInConfig, cashOutNaturalConfig, cashOutJuridicalConfig] = await Promise.all([
      getCashInConfig(),
      getCashOutNaturalConfig(),
      getCashOutJuridicalConfig(),
    ])

    const response = []

    for (let input of inputs) {
      response.push(
        await this.transactionService.addTransaction({
          input,
          cashInConfig,
          cashOutNaturalConfig,
          cashOutJuridicalConfig,
        }),
      )
    }
    return response
  }
}
