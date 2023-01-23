export interface IShortMenuGatewayDTO {
  name: string
  id: string
  thumbnailImage?: string
  fullPrice: number
  discountedPercent: number
  discountedTimePeriod?: {
    begin: string
    end: string
  }
  sold: number
  totalInStock: number
}

export interface IFullMenuGatewayDTO {
  name: string
  id: string
  thumbnailImage?: string
  fullPrice: number
  discountedPercent: number
  discountedTimePeriod?: {
    begin: string
    end: string
  }
  sold: number
  totalInStock: number
  largeImage?: string
  options: {
    label: string
    choices: {
      label: string
    }[]
  }[]
}

export interface IShortMenuPaginationDTO {
  page: number
  maxPage: number
  shortMenus: IShortMenuDTO[]
}

export type IFullMenuDTO = Omit<IFullMenuGatewayDTO, 'discountedPercent'> & {
  discountedPrice: number
}

export type IShortMenuDTO = Omit<IShortMenuGatewayDTO, 'discountedPercent'> & {
  discountedPrice: number
}
