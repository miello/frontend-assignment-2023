import { faker } from '@faker-js/faker'
import { IFullMenuGatewayDTO, IShortMenuGatewayDTO } from 'libs/src/dtos/menu'

const generateMenu = (id: string) => {
  const discountedPercent = faker.datatype.number({ min: 0, max: 100 })
  const fullPrice = faker.datatype.number({ min: 1, max: 2000 })
  const shortMenu = {
    discountedPercent,
    name: id,
    id: id,
    thumbnailImage: 'https://picsum.photos/200/300.jpg',
    fullPrice,
    sold: faker.datatype.number({ min: 10, max: 100 }),
    totalInStock: faker.datatype.number({ min: 100, max: 200 }),
  }
  return {
    short: shortMenu,
    full: {
      ...shortMenu,
      options: [
        {
          label: faker.name.jobType(),
          choices: [{ label: faker.animal.fish() }],
        },
      ],
      largeImage: 'https://picsum.photos/200/300.jpg',
    },
  }
}

export const MOCK_MENU_INFO: Record<
  string,
  { short: IShortMenuGatewayDTO; full: IFullMenuGatewayDTO }
> = {
  A: generateMenu('A'),
  B: generateMenu('B'),
  C: generateMenu('C'),
  D: generateMenu('D'),
  E: generateMenu('E'),
  F: generateMenu('F'),
  G: generateMenu('G'),
  H: generateMenu('H'),
  I: generateMenu('I'),
  J: generateMenu('J'),
}
