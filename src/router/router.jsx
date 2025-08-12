import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import categoriesRouter from "../sections/categories/router";
import { AuthProvider } from "../context/AuthContext";
import loginRouter from "../sections/login/router";
import protectedRouter from "../sections/users/prottectedRouter";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <AuthProvider>
            <Toaster position="top-center" />
            <Outlet />
          </AuthProvider>
        </>
      ),
      children: [...categoriesRouter, ...loginRouter, ...protectedRouter],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
