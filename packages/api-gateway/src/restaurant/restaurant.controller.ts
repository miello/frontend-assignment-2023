import { AxiosError } from 'axios'
import { Router } from 'express'
import {
  getShortMenuInfo,
  getFullDetailMenu,
  getRestaurantInfo,
} from './restaurant.service'

const RestaurantController = Router()

RestaurantController.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id

    const restaurant = await getRestaurantInfo(id)

    res.json(restaurant)
  } catch (err) {
    next(err)
  }
})

RestaurantController.get('/:id/shortMenu', async (req, res, next) => {
  try {
    const id = req.params.id as string
    const rawPage = (req.query.page as string) || '1'
    const rawLimit = (req.query.limit as string) || '10'

    const limit = parseInt(rawLimit, 10)
    const page = parseInt(rawPage, 10)

    if (page <= 0 || isNaN(page)) {
      throw new AxiosError('Page should be number which more than zero', '400')
    }

    if (limit <= 0 || isNaN(limit)) {
      throw new AxiosError('Limit should be number which more than zero', '400')
    }

    const shortMenu = await getShortMenuInfo(id, page, limit)

    res.json(shortMenu)
  } catch (err) {
    next(err)
  }
})

RestaurantController.get('/:id/menu/:menu', async (req, res, next) => {
  try {
    const id = req.params.id
    const menu = req.params.menu

    const fullMenu = await getFullDetailMenu(id, menu)

    res.json(fullMenu)
  } catch (err) {
    next(err)
  }
})

export default RestaurantController
