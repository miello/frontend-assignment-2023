import { RouteProps } from 'react-router-dom'
import ErrorPage from 'web/src/modules/ErrorPage'
import FoodPage from 'web/src/modules/FoodPage'
import LandingPage from 'web/src/modules/LandingPage'

const ROUTES: RouteProps[] = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/:id',
    element: <FoodPage />,
  },
  {
    path: '*',
    element: <ErrorPage message="Not Found" status={404} />,
  },
]

export default ROUTES
