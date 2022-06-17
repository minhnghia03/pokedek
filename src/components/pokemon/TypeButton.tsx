import Link from 'next/link';
import { typeColors } from '../../api/pokemon_type';

type Props = {
  type: string;
};

const TypeButton = ({ type }: Props) => {
  return (
    <Link href={`/type/${type}`} passHref>
      <a
        style={{ backgroundColor: typeColors[type] }}
        className="flex gap-1 items-center text-white rounded-full px-4 py-2 font-medium"
      >
        <img src={`/type-icons/${type}.svg`} alt={type} className="w-4" />
        <h1 className="uppercase">{type}</h1>
      </a>
    </Link>
  );
};

export default TypeButton;
