import PageFallback from "src/components/PageFallback";
import { lazy } from "react";
const CategoriesTable = lazy(() => import("./pages/CategoriesTable"));
const categoriesRouter = [
  {
    path: "/",
    element: (
      <PageFallback>
        <CategoriesTable />
      </PageFallback>
    ),
  },
];
export default categoriesRouter;
