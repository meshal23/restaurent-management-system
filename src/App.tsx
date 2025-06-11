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
import ValidateForm from "./TanstackForm/ValidateForm";
import BasicExample from "./ReactSelect/BasicExample";
import AsynchronousSelect from "./ReactSelect/AsynchronousSelect";
import StylingDropdown from "./ReactSelect/StylingDropdown";
import { AccordionDemo } from "./Pages/AccoradtionDemo";
import Counter from "./ZustandComponents/Counter";
import Todo from "./ZustandComponents/Todo";
import MoviesList from "./ZustandComponents/MoviesList";

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

          {/* tanstack form  */}
          <Route path="/tanstack-form" element={<ValidateForm />} />

          {/* react select */}
          <Route path="/react-select" element={<BasicExample />} />
          <Route path="/react-select-async" element={<AsynchronousSelect />} />
          <Route path="/react-select-styling" element={<StylingDropdown />} />

          {/* shadcn component tests */}
          <Route path="/shadcn-accordion" element={<AccordionDemo />} />

          {/* zustand test */}
          <Route path="/zustand-counter" element={<Counter />} />
          <Route path="/zustand-todo" element={<Todo />} />
          <Route path="/zustand-movie" element={<MoviesList />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
