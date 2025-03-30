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
      <aside className="w-48 bg-gray-700 h-[calc(100vh-3.5rem)] flex flex-col items-center">
        <nav className="flex flex-col gap-y-4 w-full m-3">
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
    <Link
      to={to}
      className="text-white w-full flex items-center gap-3 rounded-lg p-2 transition duration-300 hover:bg-gray-600 w-full"
    >
      <span className="text-xl transition duration-300 hover:text-gray-300">
        {icon}
      </span>
      <span className="text-base font-medium">{text}</span>
    </Link>
  );
}
