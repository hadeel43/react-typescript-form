import classNames from "classnames";

interface InputProps {
  label?: string;
  subLabel?: string;
  required?: boolean;
  render: any;
  className?: string;
}

const Input = ({
  label,
  subLabel,
  required = false,
  className = "",
  render,
}: InputProps) => (
  <div
    className={classNames({
      [className]: true,
    })}
  >
    {label && (
      <label className="mr-1 mb-1 font-light">
        {label}
        {required && (
          <>
            <span className="text-red-300">*</span>
          </>
        )}
      </label>
    )}

    {render}
    {subLabel && (
      <span className="py-2 text-sm font-light text-gray-700">{subLabel}</span>
    )}
  </div>
);

export default Input;
