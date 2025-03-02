import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';

type Props = {
  path: string;
  message: string;
  Icon: IconType;
};

export default function MenuButton({ path, message, Icon }: Props) {
  return (
    <Link to={path}>
      <button className="bg-indigo-300 p-5 rounded-2xl transition duration-400 hover:scale-102 hover:bg-indigo-400">
        <Icon size={50} />
      </button>
      <div className="flex justify-center text-md">
        <span>{message}</span>
      </div>
    </Link>
  );
}
