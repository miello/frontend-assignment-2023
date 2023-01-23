import { act, renderHook } from '@testing-library/react-hooks'
import { TransitionEvent } from 'react'

describe('useModalTransition', () => {
  const { useModalTransition } = require('.') as typeof import('.')

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should init with initial value correctly', () => {
    const { result } = renderHook(() => useModalTransition(false))

    expect(result.current.handleTransitionEnd).toBeInstanceOf(Function)
    expect(result.current.isInnerOpen).toBe(false)
  })

  it('should enable and add overflow: hidden', () => {
    const { result, rerender } = renderHook((props: boolean) =>
      useModalTransition(props)
    )

    rerender(true)

    expect(result.current.isInnerOpen).toBe(true)
    expect(document.body.style.overflow).toEqual('hidden')
  })

  it('should revert style document to normal', () => {
    const { result, rerender } = renderHook((props: boolean) =>
      useModalTransition(props)
    )

    rerender(true)

    expect(result.current.isInnerOpen).toBe(true)
    expect(document.body.style.overflow).toEqual('hidden')

    act(() => {
      result.current.handleTransitionEnd({
        currentTarget: { className: 'translate-y-full' },
      } as TransitionEvent<HTMLDivElement>)
    })

    expect(result.current.isInnerOpen).toBe(false)
    expect(document.body.style.overflow).toEqual('')
  })
})
