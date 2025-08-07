import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import GlobalLoader from "../components/loading/GlobalLoader";
import categoriesRouter from "../sections/categories/router";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <GlobalLoader />
          <Toaster position="top-center" />
          <Outlet />
        </>
      ),
      children: [...categoriesRouter],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
