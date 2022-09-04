/// <reference types="axios" />

interface CustomRequestConfig extends AxiosRequestConfig {
  errType?: ErrorType
  rawData?: boolean
}

type Ret<T> = {
  code: number
  data: T
  msg: string
}
