import axios from "axios"
import { ElMessage, ElMessageBox, ElNotification } from "element-plus"
import { ErrorType } from "@/@types/enums/ResponseErrorType"

const request = axios.create({
  baseURL: process.env.VUE_APP_AXIOS_BASE_URL,
  headers: {
    token: "12976b39ebd8f3fe02142b6996016070"
  }
})

const handleResponseError = (type: ErrorType, message: string) => {
  switch (type) {
    case ErrorType.MESSAGE:
      ElMessage.error(message)
      break
    case ErrorType.NOTIFY:
      ElNotification.error(message)
      break
    case ErrorType.DIALOG:
      ElMessageBox.alert(message)
  }
}

request.interceptors.response.use(response => {
  const reqConfig = response.config as CustomRequestConfig
  if (reqConfig.rawData) {
    return response
  }
  const data = response.data as Ret<any>
  if (data.code !== 0) {
    handleResponseError(reqConfig.errType || ErrorType.MESSAGE, data.msg)
    throw new Error(data.msg)
  }
  return response.data
}, error => {
  let message = error.message || (error.response.statusText) || (error.response.status)
  message = "网络异常: " + message
  handleResponseError(ErrorType.MESSAGE, message)
  throw error
})

export const requests = {
  get: <T> (path: string, params?: Record<string, any>, config?: CustomRequestConfig): Promise<T> => {
    return request.get(path, {
      params,
      ...config as any
    })
  },

  post: <T> (path: string, data: Record<string, any>, config?: CustomRequestConfig): Promise<T> => {
    return request.post(path, data, config as any)
  },

  put: <T> (path: string, data: Record<string, any>, config?: CustomRequestConfig): Promise<T> => {
    return request.put(path, data, config as any)
  },

  delete: <T> (path: string, params?: Record<string, any>, config?: CustomRequestConfig): Promise<T> => {
    return request.delete(path, {
      params,
      ...config
    })
  }
}
