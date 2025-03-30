import { ClipboardList, LayoutGrid, Send, Ship, Wrench } from 'lucide-react';
import { JSX, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type NavItemProps = {
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
        <nav className="flex flex-col gap-4 w-full">
          <NavItem to="/" icon={<LayoutGrid />} text="Home" />
          <NavItem to="/orders" icon={<ClipboardList />} text="Orders" />
          <NavItem to="/barge" icon={<Ship />} text="Barges" />
          <NavItem to="/tugboat" icon={<Wrench />} text="Tugboats" />
          <NavItem to="/plan" icon={<Send />} text="Plans" />
        </nav>
      </aside>
      <main className="w-full">{children}</main>
    </div>
  );
}

function NavItem({ to, icon, text }: NavItemProps): JSX.Element {
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
