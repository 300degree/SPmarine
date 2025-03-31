import { ClipboardList, LayoutGrid, Send, Ship, Wrench } from 'lucide-react';
import { JSX, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { routers } from '../common';

type ItemProps = {
  to: string;
  icon: ReactNode;
  text: string;
};

type Props = {
  children: React.ReactNode;
};

export default function Drawer({ children }: Props): JSX.Element {
  return (
    <div className="flex">
      <aside className="w-3xs h-screen flex flex-col items-center border-r-1 border-primary/10">
        <div className="h-16 w-full flex justify-center items-center border-b-1 border-primary/10">
          Logo
        </div>
        <nav className="flex flex-col gap-y-1 w-full mt-3">
          <Item to={routers.root} icon={<LayoutGrid />} text="Home" />
          <Item to={routers.orders} icon={<ClipboardList />} text="Orders" />
          <Item to={routers.barge} icon={<Ship />} text="Barges" />
          <Item to={routers.tugboat} icon={<Wrench />} text="Tugboats" />
          <Item to={routers.plan} icon={<Send />} text="Plans" />
        </nav>
      </aside>
      <main className="w-full">{children}</main>
    </div>
  );
}

function Item({ to, icon, text }: ItemProps): JSX.Element {
  return (
    <div className="h-12 hover:bg-primary/10 transition duration-300 flex justify-center">
      <Link to={to} className="w-2/3 h-full flex items-center">
        <span className="mr-5">{icon}</span>
        <span>{text}</span>
      </Link>
    </div>
  );
}
