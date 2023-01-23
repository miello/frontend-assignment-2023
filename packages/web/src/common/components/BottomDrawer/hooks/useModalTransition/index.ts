import { TransitionEvent, useCallback, useEffect, useState } from 'react'

export const useModalTransition = (isOpen: boolean) => {
  const [isInnerOpen, setInnerOpen] = useState(false)

  const handleTransitionEnd = useCallback(
    (ev: TransitionEvent<HTMLDivElement>) => {
      if (ev.currentTarget.className.includes('translate-y-full')) {
        setInnerOpen(false)
        document.body.style.overflow = ''
      }
    },
    []
  )

  useEffect(() => {
    if (isOpen) {
      setInnerOpen(true)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return { handleTransitionEnd, isInnerOpen }
}
