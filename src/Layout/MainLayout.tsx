import { Navigate, Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="w-full min-h-screen">
      {localStorage.getItem("pocketbase_token") !== null ? (
        <Outlet />
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};

export default MainLayout;
