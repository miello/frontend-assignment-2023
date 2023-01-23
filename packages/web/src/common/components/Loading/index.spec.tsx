import { render } from '@testing-library/react'

import Loading from '.'

describe('<Loading />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('centerWindow is false', () => {
    const { container } = render(<Loading />)
    expect(container.className).toEqual('')
  })

  it('centerWindow is true', () => {
    const { container } = render(<Loading centerWindow={true} />)

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstElementChild?.className).toEqual(
      'absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2'
    )
  })
})
