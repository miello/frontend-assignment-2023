import { AxiosError } from 'axios'
import { IErrorDTO, IShortMenuPaginationDTO } from 'libs/src/dtos'
import { useCallback, useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import { apiClient } from 'web/src/common/config/axios'
import { AlertContext } from 'web/src/common/contexts/AlertContext'

export const useShortMenuData = (id: string) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(
    parseInt(
      searchParams.get('page')?.match(/[0-9]+/)
        ? searchParams.get('page')!
        : '1',
      10
    )
  )

  const { showAlert } = useContext(AlertContext)
  const {
    data: shortMenu,
    isLoading,
    isError,
  } = useQuery<IShortMenuPaginationDTO, AxiosError<IErrorDTO>>(
    [`restaurant-shortmenu`, id, currentPage],
    async () => {
      setSearchParams({ page: currentPage.toString() })
      return (
        await apiClient.get<IShortMenuPaginationDTO>(
          `/restaurant/${id}/shortMenu?page=${currentPage}`
        )
      ).data
    },
    {
      onError: (err) => {
        console.log(showAlert, err)
        showAlert({
          msg:
            err.response?.data.message ||
            err.response?.statusText ||
            err.message,
          type: 'error',
        })
      },
    }
  )

  const next = useCallback(() => {
    setCurrentPage((prev) => {
      const nextPage = Math.min(prev + 1, shortMenu!.maxPage)
      return nextPage
    })
  }, [shortMenu])

  const prev = useCallback(() => {
    setCurrentPage((prev) => {
      const nextPage = Math.max(prev - 1, 1)
      return nextPage
    })
  }, [])

  const jumpTo = useCallback(
    (page: number) => {
      const nextPage = Math.max(Math.min(page, shortMenu!.maxPage), 1)
      setCurrentPage(nextPage)
    },
    [shortMenu]
  )

  return {
    currentPage,
    shortMenu,
    isMenuLoading: isLoading,
    isMenuError: isError,
    next,
    prev,
    jumpTo,
  }
}
