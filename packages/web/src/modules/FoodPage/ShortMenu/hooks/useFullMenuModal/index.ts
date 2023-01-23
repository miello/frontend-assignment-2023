import { useCallback, useState } from 'react'

export const useModalFullMenu = () => {
  const [isOpen, setOpen] = useState(false)
  const [menuName, setMenuName] = useState('')

  const toggleOpen = useCallback((menuName: string) => {
    setOpen(true)
    setMenuName(menuName)
  }, [])

  const toggleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return { isOpen, toggleOpen, toggleClose, menuName }
}
