import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BargePage from './pages/BargePage';
import OrderPage from './pages/OrderPage';
import TugboatPage from './pages/TugboatPage';
import { routers } from './common/constants/routes';
import PlanPage from './pages/PlanPage';
import FormPlans from './pages/FormPlans';

type Props = {};

export default function App({}: Props) {
  return (
    <main className="bg-[#F9F9F9] h-screen">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path={routers.tugboat} element={<TugboatPage />} />
          <Route path={routers.orders} element={<OrderPage />} />
          <Route path={routers.barge} element={<BargePage />} />
          <Route path={routers.plan} element={<PlanPage />} />
          <Route path={`${routers.plan}/:id`} element={<FormPlans />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
