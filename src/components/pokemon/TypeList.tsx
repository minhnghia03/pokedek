import TypeButton from './TypeButton';

type Props = {
  types: string[];
};

const TypeList = ({ types }: Props) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {types.map((type) => (
        <TypeButton key={type} type={type} />
      ))}
    </div>
  );
};

export default TypeList;
