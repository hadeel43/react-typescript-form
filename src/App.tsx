import "./App.css";
import { useForm, Input, Select } from "./components/Form";

type Gender = "male" | "female" | "non-binary";

interface FormProps {
  name: string;
  age: number;
  gender: Gender;
  password: string;
}

function App() {
  const { handleSubmit, handleChange, data, errors } = useForm<FormProps>({
    validations: {
      name: {
        pattern: {
          value: "^[A-Za-z]*$",
          message:
            "You're not allowed to use special characters or numbers in your name.",
        },
      },
      age: {
        custom: {
          isValid: (value) => parseInt(value, 10) > 17,
          message: "You have to be at least 18 years old.",
        },
      },
      password: {
        custom: {
          isValid: (value) => value.length > 6,
          message: "The password needs to be at least 6 characters long.",
        },
      },
    },
    onSubmit: () => alert("From submitted!"),
  });

  return (
    <form className="max-w-xl mx-auto py-14" onSubmit={handleSubmit}>
      <Input
        label="Name label"
        render={
          <div>
            <input
              placeholder="name"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
              value={data.name || ""}
              onChange={handleChange("name")}
            />
          </div>
        }
      />
      {errors.name && <p className="text-red-600">{errors.name}</p>}
      <Input
        required
        render={
          <input
            placeholder="Age"
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
            value={data.age || ""}
            onChange={handleChange<number>("age", (value) =>
              parseInt(value, 10)
            )}
          />
        }
      />
      {errors.age && <p className="text-red-600">{errors.age}</p>}

      <Input
        required
        label="Password label"
        render={
          <div>
            <input
              placeholder="Password*"
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
              value={data.password || ""}
              onChange={handleChange("password")}
            />
          </div>
        }
      />
      {errors.password && <p className="text-red-600">{errors.password}</p>}
      <Select
        required
        label="Gender label"
        options={[
          {
            value: "male",
            label: "Male",
          },
          {
            value: "female",
            label: "Female",
          },
          {
            value: "non-binary",
            label: "Non-binary",
          },
        ]}
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Submit
      </button>
    </form>
  );
}

export default App;
