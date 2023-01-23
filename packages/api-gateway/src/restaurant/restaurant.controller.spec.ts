import request from 'api-gateway/src/config/supertest'
import 'api-gateway/src/config/apiClientMock'
import { MOCK_RESTAURANT_INFO } from '../mock/restaurant'
import { MOCK_MENU_INFO } from '../mock/menu'
import { calculateDiscounted } from '../utils/price'

describe('RestaurantController', () => {
  describe('/restaurant/:id', () => {
    it('found restaurant', async () => {
      const response = await request.get('/restaurant/1234')

      const { name, activeTimePeriod, coverImage } =
        MOCK_RESTAURANT_INFO['1234']

      expect(response.statusCode).toEqual(200)
      expect(response.body).toStrictEqual({
        name,
        activeTimePeriod,
        coverImage,
      })
    })

    it('not found case', async () => {
      const response = await request.get('/restaurant/2345')

      expect(response.statusCode).toEqual(404)
      expect(response.body).toStrictEqual(
        expect.objectContaining({ message: 'Not found', status: 404 })
      )
    })
  })

  describe('/restaurant/:id/shortMenu', () => {
    const generateShortMenu = (id: string, page: number, limit: number) => {
      const maxPage = Math.floor(MOCK_RESTAURANT_INFO[id].menus.length / limit)
      const expected = MOCK_RESTAURANT_INFO[id].menus
        .slice((page - 1) * limit, page * limit)
        .map((menu) => {
          const { discountedPercent, ...remain } = MOCK_MENU_INFO[menu].short
          return {
            ...remain,
            discountedPrice: calculateDiscounted(
              remain.fullPrice,
              discountedPercent
            ),
          }
        })

      return {
        page,
        maxPage,
        shortMenus: expected,
      }
    }

    it('found case', async () => {
      const response = await request.get('/restaurant/1234/shortMenu')

      expect(response.statusCode).toEqual(200)
      expect(response.body).toStrictEqual(generateShortMenu('1234', 1, 10))
    })

    it('correct pagination', async () => {
      const limit = 3
      const page = 2
      const response = await request.get(
        `/restaurant/1234/shortMenu?limit=${limit}&page=${page}`
      )

      expect(response.statusCode).toEqual(200)
      expect(response.body).toStrictEqual(
        generateShortMenu('1234', page, limit)
      )
    })

    it('not found case', async () => {
      const response = await request.get('/restaurant/2315/shortMenu')

      expect(response.statusCode).toEqual(404)
      expect(response.body).toStrictEqual(
        expect.objectContaining({ message: 'Not found', status: 404 })
      )
    })

    describe('invalid limit query', () => {
      it('Negative case', async () => {
        const responseNeg = await request.get(
          '/restaurant/1234/shortMenu?limit=-1'
        )

        expect(responseNeg.statusCode).toEqual(400)
        expect(responseNeg.body).toStrictEqual(
          expect.objectContaining({
            message: 'Limit should be number which more than zero',
            status: 400,
          })
        )
      })

      it('NaN case', async () => {
        const responseString = await request.get(
          '/restaurant/1234/shortMenu?limit=asdfads'
        )

        expect(responseString.statusCode).toEqual(400)
        expect(responseString.body).toStrictEqual(
          expect.objectContaining({
            message: 'Limit should be number which more than zero',
            status: 400,
          })
        )
      })
    })
    describe('invalid page query', () => {
      it('Negative case', async () => {
        const responseNeg = await request.get(
          '/restaurant/1234/shortMenu?page=-1'
        )

        expect(responseNeg.statusCode).toEqual(400)
        expect(responseNeg.body).toStrictEqual(
          expect.objectContaining({
            message: 'Page should be number which more than zero',
            status: 400,
          })
        )
      })

      it('NaN case', async () => {
        const responseString = await request.get(
          '/restaurant/1234/shortMenu?page=asdfads'
        )

        expect(responseString.statusCode).toEqual(400)
        expect(responseString.body).toStrictEqual(
          expect.objectContaining({
            message: 'Page should be number which more than zero',
            status: 400,
          })
        )
      })
    })
  })

  describe('/restaurant/:id/menu/:menuName', () => {
    it('found menu case', async () => {
      const response = await request.get('/restaurant/1234/menu/A')
      const { discountedPercent, ...remain } = MOCK_MENU_INFO['A'].full

      const expected = {
        ...remain,
        discountedPrice: calculateDiscounted(
          remain.fullPrice,
          discountedPercent
        ),
      }

      expect(response.statusCode).toEqual(200)
      expect(response.body).toEqual(expected)
    })

    it('not found case', async () => {
      const response = await request.get('/restaurant/1234/menu/sda')

      expect(response.statusCode).toEqual(404)
      expect(response.body).toStrictEqual(
        expect.objectContaining({
          message: 'Not found',
          status: 404,
        })
      )
    })
  })
})
