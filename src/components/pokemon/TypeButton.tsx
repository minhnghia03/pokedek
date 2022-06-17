import Link from 'next/link';
import { typeColors } from '../../api/pokemon_type';
import styles from './TypeButton.module.css';

type Props = {
  type: string;
  size?: 'medium' | 'small';
};

const sizeMap = {
  medium: styles.medium,
  small: styles.small
};

const TypeButton = ({ type, size = 'medium' }: Props) => {
  return (
    <Link href={`/type/${type}`} passHref>
      <a
        style={{ backgroundColor: typeColors[type] }}
        className={`${styles.btn} ${sizeMap[size]}`}
      >
        <img src={`/type-icons/${type}.svg`} alt={type} />
        <h1>{type}</h1>
      </a>
    </Link>
  );
};

export default TypeButton;
