import classNames from "classnames";
interface InputProps {
    label?: string,
    subLabel?: string,
    required?: boolean,
    render: any
    className?: string,
    type?: string
}

const Input = ({
    label,
    subLabel,
    required = false,
    className = "",
    type,
    render }: InputProps) => {
    return (
        <div
            className={classNames({

                [className]: true,
            })}
        >
            {label && (
                <label className="font-light mb-1 mr-1">
                    {label}
                    {required && (
                        <>
                            <span className="text-brand-red">*</span>
                        </>
                    )}
                </label>
            )}

            {render}
            {subLabel && (
                <span className="text-sm text-gray-700 font-light py-2">
                    {subLabel}
                </span>
            )}
        </div>
    );
};

export default Input;