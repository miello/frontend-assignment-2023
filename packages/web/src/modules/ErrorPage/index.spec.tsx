import { fireEvent, render } from '@testing-library/react'

describe('ErrorPage', () => {
  const { default: ErrorPage } = require('.') as typeof import('.')

  // https://stackoverflow.com/a/66901155
  const mockedUsedNavigate = jest.fn()

  jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
  }))

  beforeEach(() => {
    mockedUsedNavigate.mockClear()
  })

  it('should render correctly', () => {
    const { getByText } = render(
      <ErrorPage message="Hello World" status={404} />
    )

    expect(getByText('Hello World').className).toEqual(
      'font-kanit text-3xl w-max font-bold'
    )
  })

  it('click button should send back to /', () => {
    const { getByText } = render(
      <ErrorPage message="Hello World" status={404} />
    )

    const buttonEl = getByText('กลับหน้าแรก')
    expect(buttonEl).toBeDefined()

    fireEvent.click(buttonEl)

    expect(mockedUsedNavigate).toBeCalledWith('/')
  })
})
