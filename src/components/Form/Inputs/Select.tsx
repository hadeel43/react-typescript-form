import Input from "./Input";

interface SelectProps {
  [x: string]: unknown;
  options: {
    value: string;
    label: string | JSX.Element;
  }[];
}

const Select = ({ options, ...props }: SelectProps) => {
  return (
    <Input
      render={
        <select className="bg-gray-50  shadow border rounded w-full py-2 px-3 text-gray-700" {...props}>
          {options.map(({ value, label }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      }
      {...props}
    />
  );
};

export default Select;