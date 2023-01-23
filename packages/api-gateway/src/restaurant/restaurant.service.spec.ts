import { IRestaurantDTO } from 'libs/src/dtos/restaurant'
import {
  getFullDetailMenu,
  getRestaurantInfo,
  getShortMenuInfo,
} from './restaurant.service'
import 'api-gateway/src/config/apiClientMock'
import { MOCK_RESTAURANT_INFO } from 'api-gateway/src/mock/restaurant'
import { MOCK_MENU_INFO } from 'api-gateway/src/mock/menu'
import { calculateDiscounted } from '../utils/price'

describe('RestaurantService', () => {
  test('getRestaurantInfo', async () => {
    const restaurantId = '1234'
    const result = await getRestaurantInfo(restaurantId)
    expect(result).toStrictEqual({
      activeTimePeriod: MOCK_RESTAURANT_INFO[restaurantId].activeTimePeriod,
      coverImage: MOCK_RESTAURANT_INFO[restaurantId].coverImage,
      name: MOCK_RESTAURANT_INFO[restaurantId].name,
    } as IRestaurantDTO)
  })

  test('getShortMenuInfo', async () => {
    const restaurantId: string = '1234'

    const result = await getShortMenuInfo(restaurantId, 2, 5)
    expect(result.shortMenus.map((val) => val.name)).toStrictEqual(
      MOCK_RESTAURANT_INFO[restaurantId].menus.slice(5, 10)
    )

    result.shortMenus.forEach((val) => {
      const mainInfo = MOCK_MENU_INFO[val.name as keyof typeof MOCK_MENU_INFO]
      const { discountedPercent, ...remain } = mainInfo.short

      const discountedPrice = calculateDiscounted(
        remain.fullPrice,
        discountedPercent
      )

      expect({ ...remain, discountedPrice })
    })
  })

  test('getFullDetailMenu', async () => {
    const menuName = 'A'

    const result = await getFullDetailMenu('12345', menuName)
    const { discountedPercent, ...remain } = MOCK_MENU_INFO[menuName].full

    expect(result).toStrictEqual({
      ...remain,
      discountedPrice: calculateDiscounted(remain.fullPrice, discountedPercent),
    })
  })
})
