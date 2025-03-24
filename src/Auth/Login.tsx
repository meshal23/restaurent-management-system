/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { ActionFunctionArgs, Form, Link, redirect } from "react-router";
import toast, { Toaster } from "react-hot-toast";

const API_URL = import.meta.env.VITE_POCKETBASE_URL;

export async function clientAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const identity = formData.get("identity");
  const password = formData.get("password");

  const data = { identity, password };

  console.log(identity, password);
  try {
    const result = await axios({
      method: "post",
      data: data,
      url: `${API_URL}users/auth-with-password`,
    });
    localStorage.setItem("pocketbase_token", result?.data?.token);
    // console.log(result.data.token);
    toast.success("Logged in successfully");

    return redirect("/pocketbase-crud");
  } catch (err) {
    console.log(err);
    toast.error("check your username or password");
    return redirect("/login");
  }
}

const Login = () => {
  return (
    <div className="bg-slate-100 w-full flex flex-col items-center justify-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="font-bold text-3xl p-3 bg-green-100 w-1/4 text-center rounded mb-2 text-blue-900">
        LOG IN
      </h1>
      <div className="w-1/4 mx-auto p-8 bg-blue-100 rounded">
        <Form method="post">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="identity"
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
              Your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white min-w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </Form>
        <p className="mt-2">
          Are you a new user?{" "}
          <Link
            to="/register"
            className="font-bold text-blue-400 hover:underline"
          >
            register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
