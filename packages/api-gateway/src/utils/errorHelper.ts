import { AxiosError, isAxiosError } from 'axios'
import { Response } from 'express'

export const assignError = (
  res: Response,
  statusCode: number,
  msg: string,
  stack?: string
) => {
  res.status(statusCode)
  res.json({
    status: statusCode,
    message: msg,
    stack: process.env.NODE_ENV !== 'production' ? stack : undefined,
  })
}

export const processError = (err: unknown, res: Response) => {
  const error = err as Error | AxiosError

  if (isAxiosError(error)) {
    assignError(
      res,
      error.response?.status || parseInt(error.code!, 10),
      error.response?.statusText || error.message,
      error.stack
    )
    return
  }
  assignError(res, 500, 'unknown error occured')
}
