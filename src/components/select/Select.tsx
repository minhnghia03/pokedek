import { useState, useRef } from 'react';
import useClickOutside from '../../utils/useClickOutside';

type SelectProps = {
  defaultValue: string;
  options: IOption[];
  onValueChange: (value: string) => void;
};

type IOption = {
  value: string;
  label: string;
};

export const Select = ({
  defaultValue,
  options,
  onValueChange
}: SelectProps) => {
  const [value, setValue] = useState(defaultValue);

  const [show, setShow] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    setShow(false);
  });

  const chose = (value: string) => {
    setValue(value);
    onValueChange(value);
  };

  const chosenLabel = options.find((option) => option.value === value)!.label;

  return (
    <div
      ref={ref}
      className={`relative w-40 cursor-pointer rounded-md px-4 py-2 border ${
        show ? 'border-blue-500' : 'border-slate-500'
      } bg-white`}
      onClick={() => setShow(!show)}
    >
      {chosenLabel}
      <ul
        className={`absolute rounded-md overflow-hidden bg-white border border-blue-500 w-40 left-0 top-full ${
          show ? '' : 'hidden'
        }`}
      >
        {options.map((option) => (
          <li
            className={`px-4 py-2 hover:bg-gray-100`}
            key={option.value}
            onClick={() => chose(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
