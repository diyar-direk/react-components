import PageFallback from "src/components/PageFallback";
import { lazy } from "react";
const CategoriesTable = lazy(() => import("./pages/CategoriesTable"));
const AddCategory = lazy(() => import("./pages/AddCategory"));
const categoriesRouter = [
  {
    path: "/",
    element: (
      <PageFallback>
        <CategoriesTable />
      </PageFallback>
    ),
  },
  {
    path: "/add_category",
    element: (
      <PageFallback>
        <AddCategory />
      </PageFallback>
    ),
  },
];
export default categoriesRouter;
