import { routers } from '../common/constants/routes'
import ManuButton from '../components/modules/ManuButton'
import { GiIronHulledWarship } from "react-icons/gi";
import { PiShippingContainerLight } from "react-icons/pi";
import { IoBarChartOutline } from "react-icons/io5";
import { CiPaperplane } from "react-icons/ci";

type Props = {}

export default function HomePage({}: Props) {
  return (
    <div className='container mx-auto h-screen flex justify-center items-center'>
      <div className='grid grid-cols-3 gap-10 place-items-center'>
        <ManuButton path={routers.orders} message='Orders' Icon={IoBarChartOutline} />
        <ManuButton path={routers.barge} message='Barges' Icon={PiShippingContainerLight} />
        <ManuButton path={routers.tugboat} message='Tugboats' Icon={GiIronHulledWarship} />
        <ManuButton path={routers.plan} message='Plans' Icon={CiPaperplane} />
      </div>
    </div>
  )
}
