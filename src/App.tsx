import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BargePage from './pages/BargePage';
import OrderPage from './pages/OrderPage';
import TugboatPage from './pages/TugboatPage';
import { routers } from './common/constants/routes';
import PlanPage from './pages/PlanPage';
import FormPlans from './pages/FormPlans';
import Header from './components/Header';
import Drawer from './components/Drawer';
import { JSX } from 'react';

export default function App(): JSX.Element {
  return (
    <main className="bg-[#F9F9F9] h-screen">
      <Header />
      <Drawer>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path={routers.tugboat} element={<TugboatPage />} />
          <Route path={routers.orders} element={<OrderPage />} />
          <Route path={routers.barge} element={<BargePage />} />
          <Route path={routers.plan} element={<PlanPage />} />
          <Route path={`${routers.plan}/:id`} element={<FormPlans />} />
        </Routes>
      </Drawer>
    </main>
  );
}
