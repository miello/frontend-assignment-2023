import { FC } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

import { useModalTransition } from './hooks/useModalTransition'
import { IBottomDrawerProps } from './types'

const BottomDrawer: FC<IBottomDrawerProps> = (props) => {
  const { isOpen, close, children } = props
  const { handleTransitionEnd, isInnerOpen } = useModalTransition(isOpen)

  return (
    <>
      <div
        onClick={close}
        className={`flex fixed justify-center 
        ${isInnerOpen ? 'z-10' : '-z-10'} 
        ml-5 mr-5 items-end top-0 bottom-0 left-0 right-0`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-[500px] pt-3 pb-3 
          ${isOpen ? 'translate-y-0' : 'translate-y-full'} 
          duration-1000 ease-in-out h-4/5 overflow-auto transition-transform bg-white rounded-t-2xl`}
          onTransitionEnd={handleTransitionEnd}
        >
          {isInnerOpen && children}
          <MdOutlineKeyboardArrowDown
            onClick={close}
            className="absolute right-2 top-2 text-4xl cursor-pointer"
          />
        </div>
      </div>
      <div
        className={`top-0 bottom-0 left-0 right-0 
        ${!isInnerOpen ? '-z-10' : ''} 
        ${isOpen ? 'opacity-100' : 'opacity-0'} 
        transition-opacity duration-500 ease-in-out fixed bg-black/20 backdrop-blur-lg`}
      />
    </>
  )
}

export default BottomDrawer
