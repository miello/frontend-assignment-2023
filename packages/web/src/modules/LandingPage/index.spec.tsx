import { fireEvent, render } from '@testing-library/react'

describe('LandingPage', () => {
  const { default: LandingPage } = require('.') as typeof import('.')

  // https://stackoverflow.com/a/66901155
  const mockedUsedNavigate = jest.fn()

  jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
  }))

  it('should function properly', () => {
    const { container, getByPlaceholderText } = render(<LandingPage />)

    const inputEl = getByPlaceholderText('เลข ID ของร้าน') as HTMLInputElement
    const btnEl = container.getElementsByTagName('button').item(0)!

    expect(inputEl).toBeDefined()
    expect(btnEl).toBeDefined()

    inputEl.value = '123456'

    fireEvent.submit(btnEl)

    expect(mockedUsedNavigate).toBeCalledWith('123456')
  })
})
