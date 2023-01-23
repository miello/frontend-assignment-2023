import { AxiosError } from 'axios'
import { MOCK_MENU_INFO } from '../mock/menu'
import { MOCK_RESTAURANT_INFO } from '../mock/restaurant'
import { apiClient } from './axios'

const apiClientMock = jest.spyOn(apiClient, 'get')
afterAll(() => {
  apiClientMock.mockClear()
})

apiClientMock.mockImplementation((url) => {
  if (url.includes('/short.json')) {
    const menu = url.split('/')[4]
    const data = MOCK_MENU_INFO[menu]?.short
    if (!data) {
      return Promise.reject({
        isAxiosError: true,
        response: {
          statusText: 'Not found',
          status: 404,
        },
        stack: Error().stack,
      } as AxiosError)
    }

    return Promise.resolve({
      data: MOCK_MENU_INFO[menu].short,
    })
  }
  if (url.includes('/full.json')) {
    const menu = url.split('/')[4]
    const data = MOCK_MENU_INFO[menu as string]?.full
    if (!data) {
      return Promise.reject({
        isAxiosError: true,
        response: {
          statusText: 'Not found',
          status: 404,
        },
        stack: Error().stack,
      } as AxiosError)
    }

    return Promise.resolve({
      data: MOCK_MENU_INFO[menu as keyof typeof MOCK_MENU_INFO].full,
    })
  }

  const restaurantId = url.split('/')[2].replace('.json', '').trim()
  const data = MOCK_RESTAURANT_INFO[restaurantId]

  if (!data) {
    return Promise.reject({
      isAxiosError: true,
      response: {
        statusText: 'Not found',
        status: 404,
      },
      stack: Error().stack,
    } as AxiosError)
  }
  return Promise.resolve({
    data: MOCK_RESTAURANT_INFO[restaurantId],
  })
})
