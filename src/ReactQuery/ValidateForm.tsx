import { useForm } from "@tanstack/react-form";

interface formProps {
  username: string;
  password: string;
  confirm_password: string;
  email: string;
  age: number;
  birth_date: string;
  isMarried: boolean;
  nationality: string;
}

const ValidateForm = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirm_password: "",
      email: "",
      age: 0,
      isMarried: false,
      nationality: "",
    } as formProps,

    onSubmit: ({ value }) => {
      console.log(value);
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <section className="w-full items-center justify-center">
      <form
        className="max-w-lg mx-auto mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        {/* username */}
        <form.Field
          name="username"
          validators={{
            onChange: ({ value }) => {
              return value.trim() === "" ? "Username is required" : undefined;
            },
          }}
        >
          {(field) => (
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />

              {field.state.meta.errors && (
                <em className="text-red-700 font-semibold">
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
          )}
        </form.Field>

        {/* email */}
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
              return !emailRegEx.test(value)
                ? "please enter a valid email"
                : undefined;
            },
          }}
        >
          {(field) => (
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />

              {field.state.meta.errors && (
                <em className="text-red-700 font-semibold">
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
          )}
        </form.Field>

        {/* age */}
        <form.Field
          name="age"
          validators={{
            onChange: ({ value }) => {
              return value < 18 ? "please be over 18 to register" : undefined;
            },
          }}
        >
          {(field) => (
            <div className="mb-5">
              <label
                htmlFor="age"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />

              {field.state.meta.errors && (
                <em className="text-red-700 font-semibold">
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
          )}
        </form.Field>

        {/* date */}
        <form.Field
          name="birth_date"
          validators={{
            onChange: ({ value }) => {
              return value === undefined ? "Birthdate is required" : undefined;
            },
          }}
        >
          {(field) => (
            <div className="mb-5">
              <label
                htmlFor="birth_date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Birthday
              </label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />

              {field.state.meta.errors && (
                <em className="text-red-700 font-semibold">
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
          )}
        </form.Field>

        {/* options select */}
        <form.Field
          name="nationality"
          validators={{
            onChange: ({ value }) => {
              return value.trim() === ""
                ? "Nationality is required"
                : undefined;
            },
          }}
        >
          {(field) => (
            <div className="mb-5">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an option
              </label>
              <select
                id="countries"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {/* <option selected>Choose a country</option> */}
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>

              {field.state.meta.errors && (
                <em className="text-red-700 font-semibold">
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
          )}
        </form.Field>

        {/* checkbox */}
        <form.Field
          name="isMarried"
          validators={{
            onChange: () => {
              return undefined;
            },
          }}
        >
          {(field) => (
            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Default checkbox
              </label>
            </div>
          )}
        </form.Field>

        {/* password */}
        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) => {
              return value.length < 8
                ? "Password is atleast contain 8 characters"
                : undefined;
            },
          }}
        >
          {(field) => (
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {field.state.meta.errors.length > 0 && (
                <em className="text-red-700 font-semibold">
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
          )}
        </form.Field>

        {/* confirm password */}
        <form.Field
          name="confirm_password"
          validators={{
            onChangeListenTo: ["password"],
            onChange: ({ value, fieldApi }) => {
              return value !== fieldApi.form.getFieldValue("password")
                ? "Passwords do not match"
                : undefined;
            },
          }}
        >
          {(field) => (
            <div className="mb-5">
              <label
                htmlFor="confirm_password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {field.state.meta.errors.length > 0 && (
                <em className="text-red-700 font-semibold">
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
          )}
        </form.Field>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default ValidateForm;
