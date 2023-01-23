import { FC } from 'react'
import BottomDrawer from 'web/src/common/components/BottomDrawer'
import Loading from 'web/src/common/components/Loading'
import Pagination from 'web/src/common/components/Pagination'
import Typography from 'web/src/common/components/Typography'

import FullMenuContent from './FullMenuContent'
import { useModalFullMenu } from './hooks/useFullMenuModal'
import { useShortMenuData } from './hooks/useShortMenuData'
import ShortMenuCard from './ShortMenuCard'
import { IShortMenuProps } from './types'

const ShortMenu: FC<IShortMenuProps> = (props) => {
  const { id } = props

  const {
    shortMenu,
    currentPage,
    next,
    prev,
    isMenuError,
    isMenuLoading,
    jumpTo,
  } = useShortMenuData(id)
  const { isOpen, menuName, toggleClose, toggleOpen } = useModalFullMenu()

  if (isMenuLoading)
    return (
      <div className="flex justify-center">
        <Loading />
      </div>
    )
  if (isMenuError) return <></>

  return (
    <>
      <div className="flex flex-col gap-4 mb-4">
        {!shortMenu?.maxPage && (
          <Typography className="text-2xl font-bold m-auto">
            ไม่มีเมนู ณ ขณะนี้
          </Typography>
        )}
        {shortMenu?.shortMenus.map((val) => (
          <ShortMenuCard
            {...val}
            open={toggleOpen}
            key={`${val.id}-page-${currentPage}-${id}`}
          />
        ))}
      </div>
      {shortMenu && shortMenu?.maxPage > 0 && (
        <div className="flex justify-center">
          <Pagination
            current={currentPage}
            maxPage={shortMenu!.maxPage}
            next={next}
            prev={prev}
            jumpTo={jumpTo}
          />
        </div>
      )}
      <BottomDrawer isOpen={isOpen} close={toggleClose}>
        <FullMenuContent restaurantId={id} menuName={menuName} />
      </BottomDrawer>
    </>
  )
}

export default ShortMenu
