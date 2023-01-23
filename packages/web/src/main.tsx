import './styles/global.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './common/components/Layout'
import { queryClient } from './common/config/reactQuery'
import { AlertProvider } from './common/contexts/AlertContext'
import ROUTES from './routes'

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AlertProvider>
          <Layout>
            <Routes>
              {ROUTES.map((routeProps, index) => (
                <Route
                  key={`route-${index}-${routeProps.path}`}
                  {...routeProps}
                />
              ))}
            </Routes>
          </Layout>
        </AlertProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
