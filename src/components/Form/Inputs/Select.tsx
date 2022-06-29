import Input from "./Input";

interface SelectProps {
  [x: string]: unknown;
  options: {
    value: string;
    label: string | JSX.Element;
  }[];
}

const Select = ({ options, ...props }: SelectProps) => (
  <Input
    render={
      <select
        className="py-2 px-3 w-full text-gray-700 bg-gray-50 rounded border shadow"
        {...props}
      >
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

export default Select;
