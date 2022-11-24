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

type Page<T> = {
  total: number
  size: number
  current: number
  records: T[]
}
