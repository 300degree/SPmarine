import { CiPaperplane } from 'react-icons/ci';
import { GiIronHulledWarship } from 'react-icons/gi';
import { IoBarChartOutline } from 'react-icons/io5';
import { PiShippingContainerLight } from 'react-icons/pi';
import { routers } from '../common/constants/routes';
import MenuButton from '../components/modules/MenuButton';

type Props = {};

export default function HomePage({}: Props) {
  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className="grid grid-cols-3 gap-10 place-items-center">
        <MenuButton
          path={routers.orders}
          message="Orders"
          Icon={IoBarChartOutline}
        />
        <MenuButton
          path={routers.barge}
          message="Barges"
          Icon={PiShippingContainerLight}
        />
        <MenuButton
          path={routers.tugboat}
          message="Tugboats"
          Icon={GiIronHulledWarship}
        />
        <MenuButton path={routers.plan} message="Plans" Icon={CiPaperplane} />
      </div>
    </div>
  );
}
