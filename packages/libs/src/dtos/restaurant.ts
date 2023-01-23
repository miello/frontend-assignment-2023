export interface IRestaurantDTO {
  name: string
  activeTimePeriod: {
    open: string
    close: string
  }
  coverImage: string
}

export interface IRestaurantGatewayDTO {
  name: string
  id: number
  coverImage: string
  menus: string[]
  activeTimePeriod: {
    open: string
    close: string
  }
}
