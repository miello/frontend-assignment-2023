import { IRestaurantGatewayDTO } from 'libs/src/dtos/restaurant'

export const MOCK_RESTAURANT_INFO: Record<string, IRestaurantGatewayDTO> = {
  1234: {
    name: 'ง่วงนอน',
    id: 1234,
    coverImage: 'https://picsum.photos/200/300.jpg',
    activeTimePeriod: {
      open: '08:30',
      close: '20:00',
    },
    menus: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
  },
}
