/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ActionFunctionArgs, Form, redirect } from "react-router";

const API_URL = import.meta.env.VITE_POCKETBASE_URL;

export async function clientAction({ request }: ActionFunctionArgs) {
  const requestData = await request.formData();

  const firstName = requestData.get("firstname");
  const lastname = requestData.get("lastname");
  const username = requestData.get("username");
  const email = requestData.get("email");
  const password = requestData.get("password");
  const passwordConfirm = requestData.get("passwordConfirm");

  const name = `${firstName} ${lastname}`;

  const data = {
    username,
    email,
    password,
    passwordConfirm,
    name,
  };

  console.log(data);

  try {
    const result = await axios({
      method: "post",
      url: `${API_URL}/users/records`,
      data: data,
    });
    console.log(result);
    localStorage.setItem("pocketbase_token", result?.data?.token);
    // console.log(result.data.token);
    toast.success("Logged in successfully");

    return redirect("/pocketbase-crud");
  } catch (err) {
    console.log(err);
    toast.error("check your username or password");
    return redirect("/register");
  }
}

const Register = () => {
  return (
    <div className="bg-slate-100 w-full flex flex-col items-center justify-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="font-bold text-3xl p-3 bg-green-100 w-1/4 text-center rounded mb-2 text-blue-900">
        REGISTER
      </h1>
      <div className="w-2/5 mx-auto p-8 bg-blue-100 rounded">
        <Form method="post">
          <div className="mb-5 grid grid-cols-2 gap-3">
            <div className="col-span-1">
              <label
                htmlFor="firstname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="lastname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-5 ">
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-5 ">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              confirm password
            </label>
            <input
              type="password"
              id="password"
              name="passwordConfirm"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white min-w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
