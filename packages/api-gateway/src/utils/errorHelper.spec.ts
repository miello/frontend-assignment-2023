import { AxiosError, AxiosResponse } from 'axios'
import { Response } from 'express'
import { processError } from './errorHelper'

describe('errorHelper', () => {
  const statusMock = jest.fn()
  const jsonMock = jest.fn()

  const res: Response = {
    status: statusMock,
    json: jsonMock,
  } as unknown as Response

  afterEach(() => {
    statusMock.mockClear()
    jsonMock.mockClear()
  })

  it('custom response error', () => {
    const err = new AxiosError()
    err.response = {
      status: 404,
      statusText: 'Not found',
    } as AxiosResponse<any>

    processError(err, res)

    expect(statusMock).toBeCalledWith(404)
    expect(jsonMock).toBeCalledWith({
      status: 404,
      message: 'Not found',
      stack: err.stack,
    })
  })

  it('axios error', () => {
    const err = new AxiosError('ABCDE', '400')
    processError(err, res)

    expect(statusMock).toBeCalledWith(400)
    expect(jsonMock).toBeCalledWith({
      status: 400,
      message: 'ABCDE',
      stack: err.stack,
    })
  })

  it('unknown error', () => {
    const err = {}

    processError(err, res)

    expect(statusMock).toBeCalledWith(500)
    expect(jsonMock).toBeCalledWith({
      status: 500,
      message: 'unknown error occured',
      stack: undefined,
    })
  })
})
