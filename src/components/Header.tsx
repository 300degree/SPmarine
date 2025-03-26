import { Link } from "react-router-dom";
import { IoHomeOutline, IoDocumentTextOutline, IoBoatOutline, IoConstructOutline, IoPaperPlaneOutline } from "react-icons/io5";
import { ReactNode } from "react";

type NavItemProps = {
  to: string;
  icon: ReactNode;
  label: string;
};

export default function Header() {
  return (
    <div className="flex">
      {/* Header */}
      <div className="w-full fixed bg-gray-700 p-4 shadow-md z-50" style={{ height: '80px' }}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Add any additional header content here */}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-60 bg-gray-700 h-screen p-4 fixed top-20 shadow-lg z-40"> 
        <div className="text-white font-bold text-2xl mb-6">SPmarine</div>
        <nav className="space-y-4">
          <NavItem to="/" icon={<IoHomeOutline />} label="Home" />
          <NavItem to="/orders" icon={<IoDocumentTextOutline />} label="Orders" />
          <NavItem to="/barge" icon={<IoBoatOutline />} label="Barges" />
          <NavItem to="/tugboat" icon={<IoConstructOutline />} label="Tugboats" />
          <NavItem to="/plan" icon={<IoPaperPlaneOutline />} label="Plans" />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-60 mt-20 p-4">
        {/* Page content goes here */}
      </div>
    </div>
  );
}

function NavItem({ to, icon, label }: NavItemProps) {
  return (
    <Link
      to={to}
      className="text-white flex items-center p-3 rounded-lg transition duration-300 hover:bg-gray-600 w-full"
    >
      <span className="mr-3 text-xl transition duration-300 hover:text-gray-300">{icon}</span>
      <span className="text-lg font-medium">{label}</span>
    </Link>
  );
}
