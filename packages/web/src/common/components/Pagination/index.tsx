import { FC, useCallback, useMemo } from 'react'
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md'

import Typography from '../Typography'
import { IPaginationProps } from './types'

const Pagination: FC<IPaginationProps> = (props) => {
  const { maxPage, next, prev, current, jumpTo } = props
  const isFirst = useMemo(() => current <= 1, [current])
  const isLast = useMemo(() => current >= maxPage, [current, maxPage])

  const pageNumber = useMemo(() => {
    let st = Math.min(Math.max(1, current - 2), maxPage)
    let ed = Math.max(1, Math.min(current + 2, maxPage))

    return Array(ed - st + 1)
      .fill(0)
      .map((_, i) => st + i)
  }, [current, maxPage])

  const handleClickPrev = useCallback(() => {
    if (isFirst) return
    prev()
  }, [isFirst, prev])

  const handleClickNext = useCallback(() => {
    if (isLast) return
    next()
  }, [isLast, next])

  const handleClickNumber = useCallback(
    (page: number) => {
      jumpTo(page)
    },
    [jumpTo]
  )

  return (
    <div className="flex items-center gap-3">
      <MdOutlineChevronLeft
        onClick={handleClickPrev}
        className={`${isFirst ? 'opacity-0' : 'cursor-pointer'} 
        text-4xl transition hover:bg-gray-200 rounded-full`}
      />
      <div className="flex gap-3 items-center">
        {pageNumber.map((val) => (
          <div
            key={`pagination-bullet-${val}`}
            className={`w-[35px] h-[35px] flex justify-center items-center transition 
            ${val === current ? 'bg-blue-400' : 'hover:bg-gray-200'} 
            cursor-pointer rounded-full`}
            onClick={() => handleClickNumber(val)}
          >
            <Typography className={`${val === current ? 'text-white' : ''} `}>
              {val}
            </Typography>
          </div>
        ))}
      </div>
      <MdOutlineChevronRight
        onClick={handleClickNext}
        className={`${isLast ? 'opacity-0' : 'cursor-pointer'} 
        text-4xl transition hover:bg-gray-200 rounded-full`}
      />
    </div>
  )
}

export default Pagination
