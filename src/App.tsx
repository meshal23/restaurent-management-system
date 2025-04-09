import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router";
import Welcome from "./Pages/Welcome";
import SummaryExample from "./Pages/SummaryExample";
import Products from "./pocketbase/Products";

import Login, { clientAction as LoginAction } from "./Auth/Login";
import Register, { clientAction as RegisterAction } from "./Auth/Register";
import MainLayout from "./Layout/MainLayout";
import ValidateForm from "./ReactQuery/ValidateForm";
import PostList from "./features/posts/PostList";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} action={LoginAction} />
        <Route
          path="/register"
          element={<Register />}
          action={RegisterAction}
        />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Welcome data={"Hello"} test={true} />} />
          <Route path="/generics" element={<SummaryExample />} />
          <Route path="/pocketbase-crud" element={<Products />} />
          <Route path="/tanstack-form" element={<ValidateForm />} />

          {/* redux practice */}
          <Route path="/redux-practice" element={<PostList />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
