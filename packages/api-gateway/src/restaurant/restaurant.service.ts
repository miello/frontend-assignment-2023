import { apiClient } from '../config/axios'
import {
  IFullMenuDTO,
  IFullMenuGatewayDTO,
  IShortMenuGatewayDTO,
  IShortMenuPaginationDTO,
} from 'libs/src/dtos/menu'
import { IRestaurantDTO, IRestaurantGatewayDTO } from 'libs/src/dtos/restaurant'
import { calculateDiscounted } from '../utils/price'

export const getRestaurantInfo = async (
  restaurantId: string
): Promise<IRestaurantDTO> => {
  const res = await apiClient.get<IRestaurantGatewayDTO>(
    `/restaurants/${restaurantId}.json`
  )

  const { coverImage, name, activeTimePeriod } = res.data

  return {
    name,
    activeTimePeriod,
    coverImage,
  }
}

export const getShortMenuInfo = async (
  restaurantId: string,
  page: number,
  limit: number
): Promise<IShortMenuPaginationDTO> => {
  const restaurantPromise = await apiClient.get<IRestaurantGatewayDTO>(
    `/restaurants/${restaurantId}.json`
  )

  const { menus } = restaurantPromise.data

  const menuSet = new Set(menus)
  const menuUnique = Array.from(menuSet)

  const targetMenus = menuUnique.slice((page - 1) * limit, page * limit)
  const shortMenusPromise = targetMenus.map(async (menu) => {
    const res = await apiClient.get<IShortMenuGatewayDTO>(
      `/restaurants/${restaurantId}/menus/${menu}/short.json`
    )
    return res.data
  })

  const shortMenus = await Promise.all(shortMenusPromise)

  return {
    page,
    maxPage: Math.floor(menus.length / limit),
    shortMenus: shortMenus.map(({ discountedPercent, ...remain }) => ({
      discountedPrice: calculateDiscounted(remain.fullPrice, discountedPercent),
      ...remain,
    })),
  }
}

export const getFullDetailMenu = async (
  restaurantId: string,
  menuName: string
): Promise<IFullMenuDTO> => {
  const res = await apiClient.get<IFullMenuGatewayDTO>(
    `/restaurants/${restaurantId}/menus/${menuName}/full.json`
  )

  const { discountedPercent, ...remain } = res.data

  return {
    ...remain,
    discountedPrice: calculateDiscounted(remain.fullPrice, discountedPercent),
  }
}
