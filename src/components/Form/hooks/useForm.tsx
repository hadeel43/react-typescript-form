import { ChangeEvent, FormEvent, useState } from "react";

interface Validation {
  // To mark an input as required and throws a validation error if it’s is.
  required?: {
    value: boolean;
    message: string;
  };
  // Allows to specify the expression that the input must match to be considered valid.
  pattern?: {
    value: string;
    message: string;
  };
  // A function that can accept a value as a parameter and then will return a boolean. If it returns true, the field is valid
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}

// Wrapped the type in the Partial type to allow empty objects ({}).
type ErrorProps<T> = Partial<Record<keyof T, string>>;

// Wrapped this inside a Partial type, making every property optional so there is no need fill out all keys,
type Validations<T extends object> = Partial<Record<keyof T, Validation>>;

// Adding a generic to the hook, I called the parameter T, T seems to be the common name for generics in TypeScript.
// The generic T extends Record, which means that the hook expect an object.
// In case the user doesn't pass down any interface, the generic falls back to an empty object (= {}).
const useForm = <
  T extends Record<keyof T, any> = Record<string, unknown>
>(options?: {
  validations?: Validations<T>;
  value?: Partial<T>;
  onSubmit?: () => void;
}) => {
  // Added the previously defined generic to the useState hook to make the returned data object typed,
  const [data, setData] = useState<T>((options?.value || {}) as T);
  const [errors, setErrors] = useState<ErrorProps<T>>({});

  // Needs to extend unknown so we can add a generic to an arrow function
  const handleChange =
    <S,>(
      key: keyof T, // The value needs to match one of the form data keys.
      // SanitizeFn is optional and accepts a function that takes a value and sanitizes it.
      // Because the return value can't be known before, added another generic for this function (S) that returns another function, which is the actual event handler. This accepts the ChangeEvents for input and select elements.
      sanitizeFn?: (value: string) => S
    ) =>
    (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
      const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;

      setData({
        ...data,
        [key]: value,
      });
    };

  // A function that handles the form submission, which calls the onSubmit function that the hook has been initialized with.
  // This function form elements, so we pass the HTMLFormElement type to FormEvent.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // to prevent the page from reloading on submission,
    const validations = options?.validations;

    if (validations) {
      let valid = true;
      const newErrors: ErrorProps<T> = {};

      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];

        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;

        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;

        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);

        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  return {
    data,
    handleChange,
    handleSubmit,
    errors,
  };
};

export default useForm;
