import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BargePage from './pages/BargePage'
import OrderPage from './pages/OrderPage'
import TugboatPage from './pages/TugboatPage'

type Props = {}

export default function App({}: Props) {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='TugboatPage' element={<TugboatPage />} />
          <Route path='OrderPage' element={<OrderPage />} />
          <Route path='BargePage' element={<BargePage />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}
