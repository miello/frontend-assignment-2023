import {
  createContext,
  FC,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import { MdClear, MdOutlineErrorOutline } from 'react-icons/md'
import Typography from 'web/src/common/components/Typography'

import { IAlert, IAlertProviderValue } from './types'

export const AlertContext = createContext<IAlertProviderValue>(
  {} as IAlertProviderValue
)

// Currently it can show only one
export const AlertProvider: FC = (props) => {
  const { children } = props
  const [alert, setAlert] = useState<IAlert>({} as IAlert)
  const [isOpen, setOpen] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout>()

  const clearAlert = useCallback(() => {
    if (!timeoutRef.current) return

    setOpen(false)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = undefined
  }, [])

  const showAlert = useCallback((alert: IAlert) => {
    if (timeoutRef.current) return
    setAlert(alert)
    setOpen(true)

    timeoutRef.current = setTimeout(() => {
      setOpen(false)
      timeoutRef.current = undefined
    }, 5000)
  }, [])

  const AlertProviderValue = useMemo(
    () => ({
      showAlert,
    }),
    [showAlert]
  )

  return (
    <AlertContext.Provider value={AlertProviderValue}>
      <div
        className={`z-20 fixed flex items-center justify-between left-1/2 -translate-x-1/2 transition-transform rounded-lg pt-2 pb-2 pl-2 pr-2 max-w-[300px] gap-2  
        ${isOpen ? 'translate-y-4' : '-translate-y-full'} 
        ${
          alert.type === 'info'
            ? 'text-black bg-white border-black border-2'
            : 'text-white bg-red-600'
        }`}
      >
        <div className="flex items-center gap-2">
          <MdOutlineErrorOutline className="text-xl" />
          <Typography className="text-lg break-all">{alert.msg}</Typography>
        </div>
        <MdClear className="text-xl cursor-pointer" onClick={clearAlert} />
      </div>
      {children}
    </AlertContext.Provider>
  )
}
